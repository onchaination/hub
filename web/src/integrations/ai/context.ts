import { SITE } from '../../lib/site';
import type { Item } from '../../lib/content';
export function aiContext(
  item: Pick<Item, 'title' | 'route' | 'section' | 'file' | 'language'>,
) {
  const instruction =
    item.section === 'skills'
      ? 'Help me understand and perform this skill step by step.'
      : item.section === 'strategies'
        ? 'Help me understand this strategy, including its assumptions, risks, trade-offs and steps.'
        : 'Teach me this topic interactively and help me verify my understanding.';
  return `Use this Onchaination page as the primary source for our conversation:\n\n${item.title}\n${SITE}${item.route}\n\nClean Markdown:\n${SITE}/${item.file}\n\nContent language: ${item.language}. Respond in this language unless I request another.\n\n${instruction}\n\nRead the source first. If you cannot access it, ask me to paste the Markdown. Distinguish the source from your own explanations and flag uncertain or changing information.`;
}
