import { shallow } from 'enzyme';
import React from 'react';
import Box from '../Box';

describe('Box matchbox component wrapper', () => {
  const subject = ({ ...props }) => {
    const defaults = {
      bg: 'magenta.400',
      padding: '600',
    };

    return shallow(<Box {...defaults} {...props} />);
  };

  it('renders component correctly', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
  });
});
