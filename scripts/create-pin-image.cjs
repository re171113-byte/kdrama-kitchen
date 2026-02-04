const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../temp-images');

async function createPinImage(config) {
  const { food, subtitle, drama, imageUrl, outputName } = config;

  console.log(`Creating ${outputName}...`);

  // Canvas size (Pinterest optimal: 1000x1500)
  const width = 1000;
  const height = 1500;
  const imageAreaHeight = Math.floor(height * 0.65);
  const textAreaHeight = height - imageAreaHeight;

  // Download source image using fetch
  console.log('  Downloading source image...');
  console.log('  URL:', imageUrl);

  const response = await fetch(imageUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);
  console.log('  Downloaded:', imageBuffer.length, 'bytes');

  // Resize and crop source image to fit top area
  const resizedImage = await sharp(imageBuffer)
    .resize(width, imageAreaHeight, { fit: 'cover', position: 'center' })
    .toBuffer();

  // Create black bottom section with text as SVG
  const svgText = `
    <svg width="${width}" height="${textAreaHeight}">
      <rect width="${width}" height="${textAreaHeight}" fill="#000000"/>
      <text x="50" y="100" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#FFFFFF">${food.toUpperCase()}</text>
      <text x="50" y="160" font-family="Arial, sans-serif" font-size="36" fill="#AAAAAA">${subtitle}</text>
      <text x="50" y="260" font-family="Arial, sans-serif" font-size="28" fill="#888888">From K-Drama: ${drama}</text>
    </svg>
  `;
  const textSection = await sharp(Buffer.from(svgText)).png().toBuffer();

  // Create RECIPE badge
  const badgeSvg = `
    <svg width="${width}" height="${imageAreaHeight}">
      <rect x="20" y="20" width="140" height="40" fill="#E53935"/>
      <text x="35" y="48" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#FFFFFF">RECIPE</text>
    </svg>
  `;
  const badge = await sharp(Buffer.from(badgeSvg)).png().toBuffer();

  // Composite image with badge
  const imageWithBadge = await sharp(resizedImage)
    .composite([{ input: badge, top: 0, left: 0 }])
    .toBuffer();

  // Combine top image and bottom text section
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, outputName);

  // Create final composite
  await sharp({
    create: {
      width: width,
      height: height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 }
    }
  })
    .composite([
      { input: imageWithBadge, top: 0, left: 0 },
      { input: textSection, top: imageAreaHeight, left: 0 }
    ])
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  console.log(`  Saved: ${outputPath}`);
}

// Create sundae pin image
createPinImage({
  food: 'SUNDAE',
  subtitle: 'Korean Blood Sausage',
  drama: 'Reply 1988',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Sundae.jpg/1280px-Sundae.jpg',
  outputName: 'sundae-pin.jpg'
}).then(() => {
  console.log('\nDone!');
}).catch(err => {
  console.error('Error:', err.message);
});
