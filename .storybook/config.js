import { configure } from '@storybook/react';

import '@sparkpost/matchbox/styles.css';
import '../src/index.scss';

configure(
  [
    require.context('../src', false, /Intro\.stories\.mdx/),
    require.context('../src', true, /\.stories\.(js|mdx)$/),
  ],
  module,
);
