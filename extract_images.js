import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function extractExactPhotos() {
  const inputImage = 'file_0000000081cc8246b2a73fa910a141be.png';
  const publicImagesDir = path.join(process.cwd(), 'public', 'images');

  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  const metadata = await sharp(inputImage).metadata();
  const W = metadata.width;
  const H = metadata.height;

  console.log(`Original screenshot dimensions: ${W} x ${H}`);

  const crops = [
    {
      name: 'hero-cat.png',
      left: Math.round(W * 0.52),
      top: Math.round(H * 0.05),
      width: Math.round(W * 0.44),
      height: Math.round(H * 0.15)
    },
    {
      name: 'kipor-6500.png',
      left: Math.round(W * 0.48),
      top: Math.round(H * 0.22),
      width: Math.round(W * 0.44),
      height: Math.round(H * 0.13)
    },
    {
      name: 'perkins-gen.png',
      left: Math.round(W * 0.09),
      top: Math.round(H * 0.403),
      width: Math.round(W * 0.26),
      height: Math.round(H * 0.072)
    },
    {
      name: 'cummins-gen.png',
      left: Math.round(W * 0.37),
      top: Math.round(H * 0.403),
      width: Math.round(W * 0.26),
      height: Math.round(H * 0.072)
    },
    {
      name: 'kipor-gen.png',
      left: Math.round(W * 0.65),
      top: Math.round(H * 0.403),
      width: Math.round(W * 0.26),
      height: Math.round(H * 0.072)
    },
    {
      name: 'technician.png',
      left: Math.round(W * 0.38),
      top: Math.round(H * 0.55),
      width: Math.round(W * 0.54),
      height: Math.round(H * 0.10)
    }
  ];

  for (const crop of crops) {
    try {
      await sharp(inputImage)
        .extract({
          left: crop.left,
          top: crop.top,
          width: crop.width,
          height: crop.height
        })
        .toFile(path.join(publicImagesDir, crop.name));
      console.log(`Successfully extracted ${crop.name}`);
    } catch (err) {
      console.error(`Error extracting ${crop.name}:`, err.message);
    }
  }

  console.log('All design photos extracted successfully!');
}

extractExactPhotos();
