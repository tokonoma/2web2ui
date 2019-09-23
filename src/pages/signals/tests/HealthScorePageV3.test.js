import { shallow } from 'enzyme';
import React from 'react';
import { HealthScorePage } from '../HealthScorePage';

describe('Signals Health Score Page V3', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      facetId: 'test.com',
      facet: 'sending-domain'
    };
    wrapper = shallow(<HealthScorePage {...props}/>);
  });

  it('renders correctly when receiving data', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
