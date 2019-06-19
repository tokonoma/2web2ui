import { shallow } from 'enzyme';
import React from 'react';

import CodeBlock from '../CodeBlock';

describe('Codeblock', () => {
  it('should render page correctly with defaults', () => {
    const children = `Big
    code`;
    const wrapper = shallow(<CodeBlock>{children}</CodeBlock>);
    expect(wrapper).toMatchSnapshot();
  });
});
