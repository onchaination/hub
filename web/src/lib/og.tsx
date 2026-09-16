import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import sharp from 'sharp';
import type { Item } from './content';
import { ui } from './ui';
import { isLocale } from './locales';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export type OgImageContent = Pick<
  Item,
  'id' | 'section' | 'language' | 'title' | 'description' | 'tags' | 'level'
>;

export function ogImageRoute(
  item: Pick<Item, 'id' | 'section' | 'language'>,
): string {
  const locale = item.language === 'en' ? '' : `/${item.language}`;
  return `/og/${item.section}/${item.id}${locale}.png`;
}

const fontFiles = [
  {
    name: 'Inter Latin',
    file: 'inter-latin-ext-400-normal.woff',
    weight: 400 as const,
  },
  {
    name: 'Inter Latin',
    file: 'inter-latin-ext-700-normal.woff',
    weight: 700 as const,
  },
  {
    name: 'Inter Cyrillic',
    file: 'inter-cyrillic-ext-400-normal.woff',
    weight: 400 as const,
  },
  {
    name: 'Inter Cyrillic',
    file: 'inter-cyrillic-ext-700-normal.woff',
    weight: 700 as const,
  },
] as const;

const fonts = Promise.all(
  fontFiles.map(async ({ name, file, weight }) => ({
    name,
    data: await readFile(
      fileURLToPath(import.meta.resolve(`@fontsource/inter/files/${file}`)),
    ),
    weight,
    style: 'normal' as const,
  })),
);

function contentFont(language: string) {
  return /^(?:be|bg|kk|ky|mk|mn|ru|sr|tg|uk)(?:-|$)/.test(language)
    ? 'Inter Cyrillic, Inter Latin'
    : 'Inter Latin';
}

function titleSize(title: string) {
  if (title.length <= 48) return 66;
  if (title.length <= 72) return 58;
  if (title.length <= 100) return 50;
  return 44;
}

export async function renderOgImage(item: OgImageContent): Promise<Buffer> {
  const fontFamily = contentFont(item.language);
  const t = ui[isLocale(item.language) ? item.language : 'en'];
  const tags = item.tags.slice(0, 4);
  const svg = await satori(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        padding: '58px 68px 54px',
        background: '#111111',
        color: '#eeeeee',
        fontFamily,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '14px',
          height: '100%',
          display: 'flex',
          background: '#eeeeee',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '58px',
          right: '-96px',
          width: '310px',
          height: '310px',
          display: 'flex',
          border: '2px solid #303030',
          borderRadius: '155px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '70px',
          bottom: '-150px',
          width: '300px',
          height: '300px',
          display: 'flex',
          border: '2px solid #303030',
          transform: 'rotate(45deg)',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          fontFamily: 'Inter Latin',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #eeeeee',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                background: '#eeeeee',
              }}
            ></div>
          </div>
          ONCHAINATION
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#aaaaaa',
            fontSize: '18px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          {t[item.section]}
          <span style={{ color: '#666666' }}>·</span>
          <span style={{ fontFamily }}>{item.language}</span>
        </div>
      </div>

      <div
        style={{
          maxWidth: '970px',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: `${titleSize(item.title)}px`,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: '-0.045em',
            lineClamp: 3,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            maxWidth: '900px',
            display: 'flex',
            color: '#aaaaaa',
            fontSize: '25px',
            lineHeight: 1.35,
            lineClamp: 2,
          }}
        >
          {item.description}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          fontFamily: 'Inter Latin',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#999999',
            fontSize: '18px',
          }}
        >
          {tags.map((tag) => (
            <span
              style={{
                display: 'flex',
                padding: '7px 12px',
                border: '1px solid #484848',
                borderRadius: '5px',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            color: '#eeeeee',
            fontSize: '20px',
            letterSpacing: '-0.01em',
          }}
        >
          {item.level ? `${t[item.level]} · ` : ''}onchaination.org
        </div>
      </div>
    </div>,
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: await fonts,
    },
  );

  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
