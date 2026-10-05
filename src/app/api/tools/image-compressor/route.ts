import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

function detectFormat(buffer: Buffer): string {
  if (buffer.length < 12) return 'unknown';

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'jpeg';
  }

  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return 'png';
  }

  if (
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return 'webp';
  }

  return 'jpeg';
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const qualityParam = formData.get('quality');
    const formatParam = formData.get('format') as string | null;
    const maxWidthParam = formData.get('maxWidth');

    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum allowed 25MB limit.' },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const detected = detectFormat(buffer);

    const quality = Math.min(100, Math.max(10, qualityParam ? parseInt(String(qualityParam), 10) : 75));
    const maxWidth = maxWidthParam ? parseInt(String(maxWidthParam), 10) : 0;
    
    let targetFormat = formatParam || 'original';
    if (targetFormat === 'original') {
      targetFormat = detected;
    }

    // Dynamic import sharp
    let compressedBuffer: Buffer = buffer;
    let outputMime = `image/${targetFormat === 'jpg' ? 'jpeg' : targetFormat}`;

    try {
      const sharp = (await import('sharp')).default;
      let pipeline = sharp(buffer, { failOn: 'none' }).rotate();

      // Apply maxWidth resizing if set
      if (maxWidth > 0) {
        pipeline = pipeline.resize({
          width: maxWidth,
          withoutEnlargement: true,
          fit: 'inside',
        });
      }

      if (targetFormat === 'webp') {
        outputMime = 'image/webp';
        compressedBuffer = await pipeline.webp({ quality, effort: 5 }).toBuffer();
      } else if (targetFormat === 'png') {
        outputMime = 'image/png';
        compressedBuffer = await pipeline.png({ quality, compressionLevel: 9 }).toBuffer();
      } else {
        outputMime = 'image/jpeg';
        // Fill transparent with white background if jpeg
        pipeline = pipeline.flatten({ background: '#ffffff' });
        compressedBuffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
      }
    } catch (err: unknown) {
      console.warn('Sharp compression unavailable on server:', err);
      return NextResponse.json(
        { error: 'Server compression engine currently unavailable. Please use browser compression mode.' },
        { status: 500 }
      );
    }

    const originalSize = buffer.length;
    const compressedSize = compressedBuffer.length;
    const savingsBytes = originalSize - compressedSize;
    const savingsPercent = originalSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0;

    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    const ext = targetFormat === 'webp' ? '.webp' : targetFormat === 'png' ? '.png' : '.jpg';
    const outputFilename = `${baseName}-compressed${ext}`;

    const wantsJson = req.nextUrl.searchParams.get('format') === 'json' || req.headers.get('accept')?.includes('application/json');

    if (wantsJson) {
      return NextResponse.json({
        success: true,
        filename: outputFilename,
        originalSize,
        compressedSize,
        savingsBytes,
        savingsPercent,
        mimeType: outputMime,
        dataUrl: `data:${outputMime};base64,${compressedBuffer.toString('base64')}`,
      });
    }

    return new Response(new Uint8Array(compressedBuffer), {
      status: 200,
      headers: {
        'Content-Type': outputMime,
        'Content-Disposition': `attachment; filename="${outputFilename}"`,
        'X-Original-Size': String(originalSize),
        'X-Compressed-Size': String(compressedSize),
        'X-Savings-Percent': String(savingsPercent),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
