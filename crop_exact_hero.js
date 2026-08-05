import sharp from 'sharp';
import path from 'path';

async function cropHeroWithBackground() {
  const inputImage = 'file_0000000081cc8246b2a73fa910a141be.png';
  const outputPath = path.join(process.cwd(), 'public', 'images', 'hero-cat.png');

  const metadata = await sharp(inputImage).metadata();
  const W = metadata.width;
  const H = metadata.height;

  // Crop the full right hero CAT generator photo with its background
  const left = Math.round(W * 0.52);
  const top = Math.round(H * 0.052);
  const width = Math.round(W * 0.44);
  const height = Math.round(H * 0.145);

  await sharp(inputImage)
    .extract({ left, top, width, height })
    .toFile(outputPath);

  console.log(`Hero photo with original background saved to ${outputPath}`);
}

cropHeroWithBackground();
