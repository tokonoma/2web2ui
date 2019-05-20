import React from 'react';
import { shallow } from 'enzyme';
import Fullscreen from '../Fullscreen';

describe('Fullscreen', () => {
  it('renders children in fullscreen layout', () => {
    const wrapper = shallow(<Fullscreen children={<div>My Page</div>} />);
    expect(wrapper).toMatchSnapshot();
  });
});
