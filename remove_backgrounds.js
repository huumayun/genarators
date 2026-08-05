import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

async function removeBackground(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixelCount = info.width * info.height;

  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];

    // Make dark/black background pixels 100% transparent PNG
    if (r < 35 && g < 35 && b < 35) {
      data[offset + 3] = 0;
    } else if (r < 55 && g < 55 && b < 55) {
      const factor = (Math.max(r, g, b) - 35) / 20;
      data[offset + 3] = Math.round(255 * factor);
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .png()
    .toFile(outputPath);

  console.log(`Saved clean transparent PNG to ${outputPath}`);
}

async function processAll() {
  const imgDir = path.join(process.cwd(), 'public', 'images');
  const cleanDir = path.join(imgDir, 'clean');

  if (!fs.existsSync(cleanDir)) {
    fs.mkdirSync(cleanDir, { recursive: true });
  }

  const files = [
    'hero-cat.png',
    'kipor-6500.png',
    'perkins-gen.png',
    'cummins-gen.png',
    'kipor-gen.png'
  ];

  for (const file of files) {
    const srcPath = path.join(imgDir, file);
    const destPath = path.join(cleanDir, file);
    if (fs.existsSync(srcPath)) {
      try {
        await removeBackground(srcPath, destPath);
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
  }

  console.log('All transparent PNGs ready in public/images/clean/');
}

processAll();
