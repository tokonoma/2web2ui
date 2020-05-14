import React from 'react';
import { tokens } from '@sparkpost/design-tokens-hibana';
import { CheckCircleOutline, ErrorOutline } from '@sparkpost/matchbox-icons';

const thresholds = {
  danger: {
    color: tokens.color_red_700,
    barColor: tokens.color_red_700,
    icon: ErrorOutline,
    condition: n => n < 55,
    description: (
      <span data-id="health-score-below-55-description">
        A Health score below 55 is considered to be <strong>bad</strong>.
      </span>
    ),
  },
  warning: {
    color: tokens.color_yellow_400,
    barColor: tokens.color_yellow_400,
    icon: ErrorOutline,
    condition: n => n < 80 && n >= 55,
    description: (
      <span data-id="health-score-below-80-description">
        A Health score below 80 <strong>needs improvement</strong>.
      </span>
    ),
  },
  good: {
    color: tokens.color_green_800,
    barColor: tokens.color_green_800,
    icon: CheckCircleOutline,
    condition: n => n >= 80,
    description: (
      <span data-id="health-score-above-80-description">
        A Health score above 80 is considered to be <strong>good</strong>.
      </span>
    ),
  },
};

export default thresholds;

export const HEALTH_SCORE_COLORS_V3 = {
  danger: '#D1E4F4',
  warning: '#91C5FD',
  good: '#4194ED',
};
