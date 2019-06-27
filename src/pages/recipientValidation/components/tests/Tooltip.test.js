import React from 'react';
import { shallow } from 'enzyme';

import Tooltip from '../Tooltip';

describe('renders tooltip correctly', () => {
  it('renders correctly icon', () => {
    expect(shallow(<Tooltip content='Here is content' />)).toMatchSnapshot();
  });
});
