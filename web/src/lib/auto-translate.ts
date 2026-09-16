type Translator = { translate(text: string): Promise<string>; destroy(): void };
type TranslatorAPI = {
  availability(options: {
    sourceLanguage: string;
    targetLanguage: string;
  }): Promise<string>;
  create(options: {
    sourceLanguage: string;
    targetLanguage: string;
  }): Promise<Translator>;
};

// Keep code, links, identifiers and explicitly protected DOM out of the model.
// Tokens are validated before any DOM is changed. Model output is always text.
export function prepareBlock(block: HTMLElement) {
  const protectedNodes: Node[] = [];
  const reserve = (node: Node) => {
    const token = `[[OC${protectedNodes.length}]]`;
    protectedNodes.push(node.cloneNode(true));
    return token;
  };
  function encode(node: Node): string {
    if (
      node instanceof Element &&
      node.matches('code, pre, a, kbd, [translate="no"], svg, img, br')
    )
      return reserve(node);
    if (node.nodeType === Node.TEXT_NODE) {
      return (node.textContent ?? '').replace(
        /https?:\/\/\S+|\b0x[a-fA-F0-9]+\b|\b[a-fA-F0-9]{32,}\b|\b[1-9A-HJ-NP-Za-km-z]{32,}\b|\b[\w-]+\.(?:md|json|ts|js|sol|yaml|yml|png|svg)\b|\b\w+_\w+\b|\b[a-z]+[A-Z]\w*\b|\b(?:ERC-\d+|EIP-\d+|ETH|BTC|SOL|USDC|USDT|UTXO|MEV|LTV)\b/g,
        (value) => reserve(document.createTextNode(value)),
      );
    }
    return [...node.childNodes].map(encode).join('');
  }
  const text = [...block.childNodes].map(encode).join('');
  return {
    text,
    restore(translated: string) {
      const tokens: string[] = translated.match(/\[\[OC\d+\]\]/g) ?? [];
      if (
        tokens.length !== protectedNodes.length ||
        new Set(tokens).size !== tokens.length ||
        protectedNodes.some((_, i) => !tokens.includes(`[[OC${i}]]`))
      )
        throw new Error('Translation changed a protected token');
      const fragment = document.createDocumentFragment();
      for (const part of translated.split(/(\[\[OC\d+\]\])/)) {
        const match = /^\[\[OC(\d+)\]\]$/.exec(part);
        fragment.append(
          match
            ? protectedNodes[Number(match[1])].cloneNode(true)
            : document.createTextNode(part),
        );
      }
      return fragment;
    },
  };
}

export function setupTranslation() {
  const panel = document.querySelector<HTMLElement>('[data-auto-translate]');
  if (!panel) return;
  const toggle = panel.querySelector<HTMLInputElement>(
    '[data-translate-toggle]',
  )!;
  const original = panel.querySelector<HTMLButtonElement>(
    '[data-translate-original]',
  )!;
  const status = panel.querySelector<HTMLElement>('[data-translate-status]')!;
  const messages = JSON.parse(panel.dataset.messages!);
  const api = (window as unknown as { Translator?: TranslatorAPI }).Translator;
  const blocks = [
    ...document.querySelectorAll<HTMLElement>(
      '[data-translate-block], [data-translate-content] :is(p,h2,h3,h4,li,td,th,summary)',
    ),
  ].filter(
    (block) =>
      !block.closest('pre,code,[translate="no"],.widget,astro-island') &&
      !block.querySelector('p,li,pre,table'),
  );
  const saved = blocks.map((block) => ({
    block,
    children: [...block.childNodes].map((node) => node.cloneNode(true)),
    lang: block.getAttribute('lang'),
  }));
  let generation = 0;
  let active: Translator | undefined;
  const restore = () => {
    generation++;
    active?.destroy();
    active = undefined;
    for (const { block, children, lang } of saved) {
      block.replaceChildren(...children.map((node) => node.cloneNode(true)));
      if (lang) block.lang = lang;
      else block.removeAttribute('lang');
    }
    toggle.checked = false;
    original.hidden = true;
    status.textContent = messages.original;
  };
  toggle.disabled = !api;
  if (!api) {
    status.textContent = messages.unavailable;
  }
  original.addEventListener('click', restore);
  toggle.addEventListener('change', async () => {
    if (!toggle.checked) {
      restore();
      return;
    }
    const version = ++generation;
    let translator: Translator | undefined;
    original.hidden = false;
    status.textContent = messages.translating;
    try {
      if (!api) throw new Error('Unsupported');
      // create() must run within the user gesture; it handles unavailable pairs too.
      translator = await api.create({
        sourceLanguage: 'en',
        targetLanguage: panel.dataset.locale!,
      });
      if (version !== generation) {
        translator.destroy();
        return;
      }
      active = translator;
      const changes: { block: HTMLElement; content: DocumentFragment }[] = [];
      for (const block of blocks) {
        const prepared = prepareBlock(block);
        if (!prepared.text.trim()) continue;
        const translated = await translator.translate(prepared.text);
        if (version !== generation) return;
        changes.push({ block, content: prepared.restore(translated) });
      }
      for (const { block, content } of changes) {
        block.replaceChildren(content);
        block.lang = panel.dataset.locale!;
      }
      status.textContent = messages.translated;
    } catch {
      if (version !== generation) return;
      restore();
      status.textContent = messages.unavailable;
    } finally {
      translator?.destroy();
      if (active === translator) active = undefined;
    }
  });
  window.addEventListener(
    'pagehide',
    () => {
      generation++;
      active?.destroy();
    },
    { once: true },
  );
}
