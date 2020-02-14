import { shallow } from 'enzyme';
import React from 'react';

import { ApiIntegrationDocs } from '../ApiDetails';

describe('ApiDetails tab', () => {
  it('should render page correctly', () => {
    const wrapper = shallow(<ApiIntegrationDocs />);
    expect(wrapper).toMatchSnapshot();
  });
});
