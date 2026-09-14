export const SITE = 'https://onchaination.org';
export const REPO = 'https://github.com/onchaination/hub';
export const sections = {
  learn: {
    label: 'Learn',
    emoji: '📚',
    purpose: 'Understand something',
    description: 'Clear explanations. A stronger mental model.',
  },
  tools: {
    label: 'Tools',
    emoji: '🛠️',
    purpose: 'Use an interface',
    description: 'Useful interfaces to explore and calculate.',
  },
  strategies: {
    label: 'Strategies',
    emoji: '🎯',
    purpose: 'Pursue an outcome',
    description: 'Approaches with explicit risks and trade-offs.',
  },
  skills: {
    label: 'Skills',
    emoji: '⚡',
    purpose: 'Perform a procedure',
    description: 'Practical steps you can follow and verify.',
  },
} as const;
export type Section = keyof typeof sections;
export const sectionKeys = Object.keys(sections) as Section[];
