import { NextRequest, NextResponse } from 'next/server';
import { scanImageMetadata } from '@/lib/tools/metadata/scanner';
import { cleanImageMetadata } from '@/lib/tools/metadata/cleaner';
import { verifyAndCompare } from '@/lib/tools/metadata/verification';
import { CleaningMode } from '@/types/tools';

export const runtime = 'nodejs';
// Allow up to 25MB uploads
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

function validateMagicBytes(buffer: Buffer): { valid: boolean; format?: string; error?: string } {
  if (buffer.length < 12) {
    return { valid: false, error: 'File is too small to be a valid image.' };
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, format: 'jpeg' };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, format: 'png' };
  }

  // WebP: RIFF ... WEBP
  if (
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return { valid: true, format: 'webp' };
  }

  // AVIF / HEIC: ftyp box
  if (buffer.toString('ascii', 4, 8) === 'ftyp') {
    const brand = buffer.toString('ascii', 8, 12).toLowerCase();
    if (brand === 'avif' || brand === 'avis') {
      return { valid: true, format: 'avif' };
    }
    if (brand === 'heic' || brand === 'heix' || brand === 'mif1') {
      return { valid: true, format: 'heic' };
    }
  }

  // TIFF: II*\0 or MM\0*
  if (
    (buffer[0] === 0x49 && buffer[1] === 0x49 && buffer[2] === 0x2a && buffer[3] === 0x00) ||
    (buffer[0] === 0x4d && buffer[1] === 0x4d && buffer[2] === 0x00 && buffer[3] === 0x2a)
  ) {
    return { valid: true, format: 'tiff' };
  }

  return {
    valid: false,
    error: 'Unsupported image format. Please upload a standard JPG, PNG, WebP, AVIF, or TIFF file.',
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;
    const action = (formData.get('action') as string) || 'clean';
    const mode = (formData.get('mode') as CleaningMode) || 'metadata-only';
    const qualityParam = Number(formData.get('quality') || 90);
    const quality = isNaN(qualityParam) ? 90 : Math.max(50, Math.min(100, qualityParam));

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image file provided.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 25 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).`,
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate actual file signature/magic bytes
    const validation = validateMagicBytes(buffer);
    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }

    // Fast Scan Action
    if (action === 'scan') {
      const scanResult = await scanImageMetadata(buffer);
      return NextResponse.json({ success: true, data: scanResult });
    }

    // Full Clean & Verification Action
    // Step 1: Initial Scan (Before)
    const beforeScan = await scanImageMetadata(buffer);

    // Step 2: Clean Metadata
    const cleanResult = await cleanImageMetadata(buffer, { mode, quality });

    // Step 3: Second Metadata Scan & Verification (After)
    const { afterScan, verification } = await verifyAndCompare(
      beforeScan,
      cleanResult.cleanedBuffer,
      mode,
      buffer.length
    );

    // Prepare clean output filename
    const originalName = file instanceof File ? file.name : 'image';
    const sanitizedBase = originalName
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\.[^/.]+$/, '');
    const cleanFilename = `cleaned-${sanitizedBase}.${cleanResult.format === 'jpeg' ? 'jpg' : cleanResult.format}`;

    const base64Data = cleanResult.cleanedBuffer.toString('base64');
    const dataUri = `data:${cleanResult.mimeType};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      data: {
        cleanedImageBase64: dataUri,
        mimeType: cleanResult.mimeType,
        filename: cleanFilename,
        beforeScan,
        afterScan,
        verification,
      },
    });
  } catch (error: any) {
    console.error('Metadata cleaner API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'An unexpected error occurred while processing the image.',
      },
      { status: 500 }
    );
  }
}
