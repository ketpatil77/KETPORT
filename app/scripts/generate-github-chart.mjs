import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputPath = path.join(rootDir, 'public', 'github-contributions-dark.svg');

const SOURCE_URL = 'https://ghchart.rshah.org/39d353/ketpatil77';
const darkPalette = {
  0: '#161b22',
  1: '#0e4429',
  2: '#26a641',
  4: '#39d353',
};

function recolorSvg(svg) {
  return svg.replace(/<rect\b[^>]*>/g, (tag) => {
    const scoreMatch = tag.match(/data-score="(\d+)"/);
    if (!scoreMatch) return tag;

    const score = Number(scoreMatch[1]);
    const fill = darkPalette[score];
    if (!fill) return tag;

    if (tag.includes('fill:')) {
      return tag.replace(/fill:#([0-9A-Fa-f]{6})/, `fill:${fill}`);
    }

    return tag.replace(/\/>$/, ` style="fill:${fill};shape-rendering:crispedges;"/>`);
  });
}

async function main() {
  const res = await fetch(SOURCE_URL, {
    headers: {
      Accept: 'image/svg+xml',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub chart SVG (${res.status})`);
  }

  const svg = await res.text();
  const darkSvg = recolorSvg(svg);
  await writeFile(outputPath, darkSvg, 'utf8');
}

main().catch(async (error) => {
  const fallbackPath = path.join(rootDir, 'public', 'github-contributions-dark.svg');
  try {
    const existing = await readFile(fallbackPath, 'utf8');
    if (existing) {
      console.warn('[generate-github-chart] using existing SVG fallback:', error.message);
      process.exit(0);
    }
  } catch {}

  console.error(error);
  process.exit(1);
});
