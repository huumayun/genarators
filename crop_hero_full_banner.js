import sharp from 'sharp';
import path from 'path';

async function cropHeroFullBanner() {
  const inputImage = 'file_0000000081cc8246b2a73fa910a141be.png';
  const outputPath = path.join(process.cwd(), 'public', 'images', 'hero-bg-banner.jpg');

  const metadata = await sharp(inputImage).metadata();
  const W = metadata.width;
  const H = metadata.height;

  // Crop full hero section area (from bottom of header to top of section 2)
  const left = 0;
  const top = Math.round(H * 0.053);
  const width = W;
  const height = Math.round(H * 0.145);

  await sharp(inputImage)
    .extract({ left, top, width, height })
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log(`Saved exact Hero full banner to ${outputPath}`);
}

cropHeroFullBanner();
