import sharp from "sharp";
import { fileURLToPath } from "node:url";

const sizes = [192, 512];

function logoSvg(size) {
  const scale = size / 512;
  const stroke = Math.max(10, Math.round(18 * scale));

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="70" y1="48" x2="445" y2="470">
          <stop stop-color="#152a31"/>
          <stop offset="0.58" stop-color="#080d14"/>
          <stop offset="1" stop-color="#101020"/>
        </linearGradient>
        <linearGradient id="left" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#57f2cc"/>
          <stop offset="1" stop-color="#57b8ff"/>
        </linearGradient>
        <linearGradient id="right" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#57b8ff"/>
          <stop offset="1" stop-color="#b58cff"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="${18 * scale}" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect x="18" y="18" width="476" height="476" rx="128" fill="url(#bg)"/>
      <rect x="37" y="37" width="438" height="438" rx="110"
        fill="none" stroke="#ffffff" stroke-opacity=".08" stroke-width="${stroke}"/>
      <path d="M147 369 L170 139 L256 305" fill="none"
        stroke="url(#left)" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"
        filter="url(#glow)"/>
      <path d="M256 207 L342 373 L365 143" fill="none"
        stroke="url(#right)" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"
        filter="url(#glow)"/>
      <text x="256" y="292" text-anchor="middle" fill="#e8fff9"
        font-family="Arial, sans-serif" font-size="94" font-weight="800">N</text>
      <circle cx="145" cy="112" r="13" fill="#ffffff" filter="url(#glow)"/>
      <circle cx="368" cy="401" r="13" fill="#ffffff" filter="url(#glow)"/>
    </svg>`;
}

for (const size of sizes) {
  await sharp(Buffer.from(logoSvg(size)))
    .png()
    .toFile(fileURLToPath(new URL(`../public/icon-${size}.png`, import.meta.url)));
}

console.log(`Ícones NexaCode gerados: ${sizes.join(", ")} px`);
