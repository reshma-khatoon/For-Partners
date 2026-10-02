const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = process.cwd();
const dirs = [
  path.join(root, 'public', 'gifs', 'dudu-bubu'),
  path.join(root, 'public', 'images', 'memories'),
  path.join(root, 'public', 'music'),
];

dirs.forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

const gifNames = [
  'hug.gif',
  'cuddle.gif',
  'sad.gif',
  'cry.gif',
  'sorry.gif',
  'love.gif',
  'kiss.gif',
  'flowers.gif',
  'happy.gif',
  'sleep.gif',
  'heart.gif',
  'miss-you.gif',
  'comfort.gif',
  'angry-cute.gif',
  'makeup.gif',
];

for (const name of gifNames) {
  const label = name.replace(/[-.]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffeaf1"/>
          <stop offset="100%" stop-color="#f5d8c4"/>
        </linearGradient>
      </defs>
      <rect width="500" height="500" fill="url(#g)"/>
      <circle cx="170" cy="200" r="70" fill="#f4b7c9" opacity="0.9"/>
      <circle cx="330" cy="200" r="70" fill="#f4b7c9" opacity="0.9"/>
      <circle cx="195" cy="180" r="18" fill="#fff"/>
      <circle cx="305" cy="180" r="18" fill="#fff"/>
      <circle cx="193" cy="180" r="7" fill="#3c2d2d"/>
      <circle cx="303" cy="180" r="7" fill="#3c2d2d"/>
      <path d="M180 250 Q250 290 320 250" fill="none" stroke="#7d4c56" stroke-width="10" stroke-linecap="round"/>
      <path d="M170 330 Q250 360 330 330" fill="none" stroke="#d98ca0" stroke-width="14" stroke-linecap="round"/>
      <g fill="#ffffff" opacity="0.7">
        <circle cx="110" cy="90" r="18"/>
        <circle cx="375" cy="100" r="14"/>
        <circle cx="420" cy="340" r="16"/>
      </g>
      <text x="250" y="420" font-size="26" text-anchor="middle" font-family="Arial, sans-serif" fill="#5e4648" style="font-weight:700; letter-spacing:1px;">Dudu &amp; Bubu</text>
      <text x="250" y="455" font-size="20" text-anchor="middle" font-family="Arial, sans-serif" fill="#6d4a4d">${label}</text>
    </svg>
  `;

  sharp(Buffer.from(svg)).resize(500, 500).gif().toFile(path.join(root, 'public', 'gifs', 'dudu-bubu', name));
}

for (let i = 1; i <= 8; i += 1) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#fff5f8"/>
          <stop offset="100%" stop-color="#f8e1d6"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#bg)"/>
      <rect x="70" y="75" width="660" height="820" rx="40" fill="#fffdfd" opacity="0.88"/>
      <circle cx="400" cy="370" r="200" fill="#f8d3d9" opacity="0.8"/>
      <circle cx="320" cy="350" r="70" fill="#eaa7ba" opacity="0.7"/>
      <circle cx="480" cy="350" r="70" fill="#eaa7ba" opacity="0.7"/>
      <path d="M275 440 Q400 500 525 440" fill="none" stroke="#7a4d57" stroke-width="12" stroke-linecap="round"/>
      <circle cx="320" cy="330" r="10" fill="#5c3e41"/>
      <circle cx="480" cy="330" r="10" fill="#5c3e41"/>
      <path d="M350 300 Q400 330 450 300" fill="none" stroke="#5c3e41" stroke-width="8" stroke-linecap="round"/>
      <text x="400" y="700" text-anchor="middle" font-size="52" fill="#6a4a4d" font-family="Arial, sans-serif" style="font-weight:700; letter-spacing:2px;">MEMORY</text>
      <text x="400" y="770" text-anchor="middle" font-size="30" fill="#876469" font-family="Arial, sans-serif">Photo ${i}</text>
    </svg>
  `;

  sharp(Buffer.from(svg)).resize(800, 1000).jpeg({ quality: 85 }).toFile(path.join(root, 'public', 'images', 'memories', `photo${i}.jpg`));
}

fs.writeFileSync(path.join(root, 'public', 'music', 'love-song.mp3'), Buffer.alloc(1024));
console.log('Assets created successfully');
