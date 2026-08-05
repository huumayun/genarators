import sharp from 'sharp';
import path from 'path';

async function trimBorders() {
  const inputImage = 'file_0000000081cc8246b2a73fa910a141be.png';
  const imgDir = path.join(process.cwd(), 'public', 'images');

  const metadata = await sharp(inputImage).metadata();
  const W = metadata.width;
  const H = metadata.height;

  // Crop exact INNER light grey photo region of each card (excluding black border)
  const crops = [
    {
      name: 'perkins-gen.png',
      left: Math.round(W * 0.098),
      top: Math.round(H * 0.407),
      width: Math.round(W * 0.245),
      height: Math.round(H * 0.063)
    },
    {
      name: 'cummins-gen.png',
      left: Math.round(W * 0.378),
      top: Math.round(H * 0.407),
      width: Math.round(W * 0.245),
      height: Math.round(H * 0.063)
    },
    {
      name: 'kipor-gen.png',
      left: Math.round(W * 0.658),
      top: Math.round(H * 0.407),
      width: Math.round(W * 0.245),
      height: Math.round(H * 0.063)
    }
  ];

  for (const crop of crops) {
    try {
      const outputPath = path.join(imgDir, crop.name);
      await sharp(inputImage)
        .extract({
          left: crop.left,
          top: crop.top,
          width: crop.width,
          height: crop.height
        })
        .toFile(outputPath);
      console.log(`Successfully trimmed black box from ${crop.name}`);
    } catch (err) {
      console.error(`Error trimming ${crop.name}:`, err.message);
    }
  }

  console.log('All black borders removed!');
}

trimBorders();
