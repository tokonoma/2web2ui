import { tokens } from '@sparkpost/design-tokens-hibana';

export default {
  new: {
    OGFill: '#88E2E7',
    hibanaFill: tokens.color_blue_500,
    OGStroke: '#88E2E7',
    hibanaStroke: tokens.color_blue_500,
    label: 'New',
    description: 'Never engaged, first email in last 7 days',
  },
  uneng: {
    OGFill: '#50CFDA',
    hibanaFill: tokens.color_blue_600,
    OGStroke: '#50CFDA',
    hibanaStroke: tokens.color_blue_600,
    label: 'Never Engaged',
    description: '365+ days since last engagement',
  },
  '365d': {
    OGFill: '#29B9C7',
    hibanaFill: tokens.color_blue_700,
    OGStroke: '#29B9C7',
    hibanaStroke: tokens.color_blue_700,
    label: 'Not Recently Engaged',
    description: '90-365 days since last engagement',
  },
  '90d': {
    OGFill: '#219EA8',
    hibanaFill: tokens.color_blue_800,
    OGStroke: '#219EA8',
    hibanaStroke: tokens.color_blue_800,
    label: 'Semi Recently Engaged',
    description: '14-90 days since last engagement',
  },
  '14d': {
    OGFill: '#1A838B',
    hibanaFill: tokens.color_blue_900,
    OGStroke: '#1A838B',
    hibanaStroke: tokens.color_blue_900,
    label: 'Recently Engaged',
    description: '0-14 days since last engagement',
  },
};
