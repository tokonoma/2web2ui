import { configure } from '@storybook/react';

import '../src/critical.scss';
import '../src/index.scss';

configure([
  require.context('../src', false, /Intro\.stories\.mdx/),
  require.context('../src', true, /\.stories\.(js|mdx)$/)
], module);

