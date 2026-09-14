import NetworkFee from './NetworkFee';
import type { WidgetName } from './schema';

export const widgets = { 'network-fee': NetworkFee } satisfies Record<
  WidgetName,
  typeof NetworkFee
>;
