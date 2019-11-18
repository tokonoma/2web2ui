import { configure } from '@storybook/react';

import '../src/critical.scss';
import '../src/index.scss';

configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module)

configure(loadStories, module);
