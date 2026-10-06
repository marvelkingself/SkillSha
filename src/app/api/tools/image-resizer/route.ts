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
    const widthParam = formData.get('width');
    const heightParam = formData.get('height');
    const fitParam = (formData.get('fit') as string | null) || 'cover';
    const formatParam = formData.get('format') as string | null;
    const qualityParam = formData.get('quality');
    const bgParam = (formData.get('backgroundColor') as string | null) || '#FFFFFF';

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

    let targetWidth = widthParam ? parseInt(String(widthParam), 10) : 0;
    let targetHeight = heightParam ? parseInt(String(heightParam), 10) : 0;
    const quality = Math.min(100, Math.max(10, qualityParam ? parseInt(String(qualityParam), 10) : 85));

    let targetFormat = formatParam || 'original';
    if (targetFormat === 'original') {
      targetFormat = detected;
    }

    // Dynamic import sharp
    let sharpFit: 'cover' | 'contain' | 'fill' = 'cover';
    if (fitParam === 'contain') sharpFit = 'contain';
    else if (fitParam === 'fill') sharpFit = 'fill';

    try {
      const sharp = (await import('sharp')).default;
      let pipeline = sharp(buffer, { failOn: 'none' }).rotate();

      const meta = await sharp(buffer).metadata();
      const origW = meta.width || 800;
      const origH = meta.height || 600;

      if (!targetWidth && !targetHeight) {
        targetWidth = origW;
        targetHeight = origH;
      }

      pipeline = pipeline.resize({
        width: targetWidth || undefined,
        height: targetHeight || undefined,
        fit: sharpFit,
        background: targetFormat === 'jpeg' ? bgParam : undefined,
      });

      let outputBuffer: Buffer;
      let outputMime = `image/${targetFormat === 'jpg' ? 'jpeg' : targetFormat}`;

      if (targetFormat === 'webp') {
        outputBuffer = await pipeline.webp({ quality }).toBuffer();
        outputMime = 'image/webp';
      } else if (targetFormat === 'png') {
        outputBuffer = await pipeline.png({ compressionLevel: 8 }).toBuffer();
        outputMime = 'image/png';
      } else {
        outputBuffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
        outputMime = 'image/jpeg';
      }

      const resizedMeta = await sharp(outputBuffer).metadata();

      const returnJson = req.headers.get('accept')?.includes('application/json');
      if (returnJson) {
        return NextResponse.json({
          success: true,
          originalSize: file.size,
          resizedSize: outputBuffer.length,
          originalWidth: origW,
          originalHeight: origH,
          resizedWidth: resizedMeta.width,
          resizedHeight: resizedMeta.height,
          format: targetFormat,
          base64: `data:${outputMime};base64,${outputBuffer.toString('base64')}`,
        });
      }

      const dotIndex = file.name.lastIndexOf('.');
      const baseName = dotIndex !== -1 ? file.name.substring(0, dotIndex) : file.name;
      const ext = targetFormat === 'jpeg' ? '.jpg' : `.${targetFormat}`;
      const downloadName = `${baseName}-${resizedMeta.width}x${resizedMeta.height}${ext}`;

      return new NextResponse(outputBuffer as unknown as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': outputMime,
          'Content-Disposition': `attachment; filename="${downloadName}"`,
          'X-Resized-Width': String(resizedMeta.width || targetWidth),
          'X-Resized-Height': String(resizedMeta.height || targetHeight),
          'X-Resized-Size': String(outputBuffer.length),
        },
      });
    } catch (sharpError) {
      console.warn('Sharp backend unavailable, falling back:', sharpError);
      return NextResponse.json(
        {
          error:
            'Server-side image resizer is currently operating in client-preferred mode. Please resize directly in your browser.',
        },
        { status: 503 }
      );
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown server error during resize';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Skillsha Free Online Image Resizer API',
    endpoints: {
      post: {
        description: 'Resize an image with custom width, height, fit mode, and format',
        acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
        maxFileSize: '25MB',
      },
    },
  });
}
