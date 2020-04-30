import { shallow } from 'enzyme';
import React from 'react';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import styles from '../CodeBlock.module.scss';

import CodeBlock from '../CodeBlock';

jest.mock('src/hooks/useHibanaOverride');

describe('Codeblock', () => {
  beforeEach(() => {
    useHibanaOverride.mockReturnValue(styles);
  });

  it('should render page correctly with defaults', () => {
    const children = `Big
    code`;
    const wrapper = shallow(<CodeBlock>{children}</CodeBlock>);
    expect(wrapper).toMatchSnapshot();
  });
});
