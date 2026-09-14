import { z } from 'zod';

// Each widget owns a strict parameter schema. Never evaluate directive text.
export const widgetSchemas = {
  'network-fee': z
    .object({
      chain: z.enum(['ethereum', 'solana']).default('ethereum'),
      gas: z.coerce.number().int().min(1).max(100_000_000).default(21000),
      gwei: z.coerce.number().min(0).max(1_000_000).default(10),
    })
    .strict(),
};
export type WidgetName = keyof typeof widgetSchemas;
export function parseWidget(directive: string) {
  const match = /^<!--\s*widget:([a-z0-9-]+)(.*?)\s*-->$/s.exec(
    directive.trim(),
  );
  if (!match) throw new Error(`Malformed widget directive: ${directive}`);
  const [, name, rest] = match;
  if (!Object.hasOwn(widgetSchemas, name))
    throw new Error(`Unknown widget: ${name}`);
  const params: Record<string, string> = {};
  for (const pair of rest.trim().split(/\s+/).filter(Boolean)) {
    const parameter = /^([a-z][a-z0-9-]*)=([^\s=]+)$/.exec(pair);
    if (!parameter || parameter[1] in params)
      throw new Error(`Invalid or repeated widget parameter: ${pair}`);
    params[parameter[1]] = parameter[2];
  }
  return {
    name: name as WidgetName,
    props: widgetSchemas[name as WidgetName].parse(params),
  };
}
