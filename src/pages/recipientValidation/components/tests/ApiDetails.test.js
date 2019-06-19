import { shallow } from 'enzyme';
import React from 'react';

import ApiDetails from '../ApiDetails';

describe('ApiDetails tab', () => {
  it('should render page correctly', () => {
    const wrapper = shallow(<ApiDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
