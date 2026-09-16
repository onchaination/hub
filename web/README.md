# The website

Astro turns the four root Markdown folders into static HTML. React is used only for interactive widgets. Pagefind adds a static search index after the build. No server, database, or API key is needed.

Run commands from the **repository root**:

```sh
npm ci
npm run dev       # http://localhost:4321; Markdown changes reload
npm run check     # content validation + Astro/TypeScript
npm test          # content and calculator behavior
npm run build     # static output + Pagefind + output validation
npm run preview   # preview the complete build, including search
```

Use Node 24 LTS. Search needs a production build; in development the search page explains this and lists every page.

## Where things live

| File or folder                                       | Responsibility                                          |
| ---------------------------------------------------- | ------------------------------------------------------- |
| `../learn`, `../tools`, `../strategies`, `../skills` | Canonical content and nearby images                     |
| `src/lib/content.ts`                                 | Read, validate, connect, and render Markdown            |
| `src/lib/site.ts`                                    | Canonical site URL, repository, four paths              |
| `src/pages`                                          | Static routes, raw Markdown/assets, `llms.txt`, sitemap |
| `src/layouts/Site.astro`                             | Shared document, navigation, footer                     |
| `src/components`                                     | Content rows, Markdown, AI context, Telegram discussion |
| `src/widgets/schema.ts`                              | Strict directive parameter schemas                      |
| `src/widgets/registry.ts`                            | Stable widget IDs → React components                    |
| `src/widgets/NetworkFee.tsx`                         | Example widget; arithmetic lives in `fee.ts`            |
| `src/integrations/ai`                                | Context generation and ordinary provider links          |
| `src/styles/global.css`                              | Monochrome design and responsive layout                 |
| `tests`                                              | Content contracts and arithmetic regression tests       |
| `e2e`                                                | Browser checks against the built site                   |

There is one small content loader, in `src/lib/content.ts`, which validates root Markdown directly. Astro collections are not required. Each item’s `contentKey` is its section-and-folder path. Related references use that path, then shared tags provide additional suggestions. No Markdown ID is needed.

`src/lib/locales.ts` registers languages and provides locale/path helpers. `src/lib/ui.ts` contains complete dictionaries checked at build time. Astro native i18n is configured with unprefixed English; existing English routes and `[locale]/[...path].astro` render the same shared views. Add a locale and its UI dictionary without duplicating components.

`resolveContent(item, locale)` prefers the stored translation, otherwise selects `en.md` while retaining `interfaceLocale`. Every knowledge item gets a view in every supported locale. Markdown links, navigation, related items and language switches retain that locale. Source `.md` files are published byte for byte; missing translations never produce fabricated source files.

Pagefind indexes the rendered article for each interface locale, including English fallback bodies. Thus each locale index contains one result per knowledge item with the preferred available title and body. Search stays on the locale route and does not need `?lang=`. Ukrainian word search currently has no stemming, so different grammatical forms may need separate queries. Search is unavailable in dev until a production index exists; the full static list remains usable.

Stored translations use self-canonicals and reciprocal hreflang. Fallbacks use the English canonical and are excluded from localized sitemap entries and hreflang. Browser translation never changes SEO metadata. Raw sources and generated social cards remain tied to stored representations.

Auto-translate is an off-by-default browser-only control on fallback articles. It feature-detects `Translator`, calls it only after activation, translates meaningful blocks and protects code, links, technical tokens and `translate="no"` elements. It applies changes atomically, treats output as text, and restores the original DOM on disable or error. It uses no service, cache, database or source-file writes. Actual API availability and language-pack downloads depend on the browser; browser tests mock supported, failed and absent implementations.

The color theme defaults to the system preference. Readers can choose System, Light, or Dark in the header (inside Menu on mobile). `Site.astro` applies the preference before paint and stores it locally as `onchaination-theme`; CSS also follows the system without JavaScript. Theme colors live in `global.css`, and Shiki renders both code palettes.

Each real content translation gets a localized 1200×630 social preview at `/og/<section>/<id>[/<language>].png`. Astro prerenders the route with Satori and Sharp from Markdown metadata; no image service or runtime server is involved. Missing translations do not generate social preview routes.

## Browser checks

```sh
npx playwright install chromium
npm run test:e2e -w web
```

The browser suite builds and starts its own preview server. To use a local Chrome installation instead of downloading Chromium, set `PLAYWRIGHT_CHROME=1`.

## Publish to GitHub Pages

1. In the canonical `onchaination/hub` repository, enable **Settings → Pages → Source → GitHub Actions**.
2. Configure `onchaination.org` in Pages and point its DNS to GitHub Pages. `public/CNAME` and the canonical URL in `src/lib/site.ts` use this domain. The site assumes deployment at the domain root.
3. Merge into `main` or run the Pages workflow manually. Pull requests validate without deploying.

The artifact is `web/dist/`. All its files, including `pagefind`, must be published together. GitHub Pages serves the generated Markdown files; MIME handling is hosting-dependent, while alternate links advertise `text/markdown`.

## Enable Telegram discussion

Link `@onchaination_chat` as the discussion group for `@onchaination_info`. Keep `@onchaination_group` as the separate forum. Post each newly published page's **clean English URL** once in the updates channel, without UTM parameters. Editing a page does not require reposting it.

The [official discussion widget](https://core.telegram.org/widgets/discussion) receives an explicit `data-page-url` equal to `SITE + localePath(contentKey, 'en')`. The public widget script checks this attribute before its canonical fallback. This is the conversation lookup key, independent of HTML canonical URLs. Posting the English URL once gives all locale views the same lookup; do not post a separate thread for each translation. The site opens and embeds it when the discussion scrolls into view; the “Load Telegram comments” control remains as a fallback when automatic loading is unavailable. No per-page IDs, comment store, or posting bot are used. External Telegram availability and channel configuration require a live deployment to verify fully.

## Phase 2

Participant-controlled identity, claims, proofs, and reward attribution remain specified in `SPEC.md`. Add infrastructure only when implementing those features. The knowledge site must remain independently usable and deployable.
