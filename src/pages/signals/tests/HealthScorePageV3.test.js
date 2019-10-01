import { shallow } from 'enzyme';
import React from 'react';
import { HealthScorePageV3 } from '../HealthScorePageV3';

describe('Signals Health Score Page V3', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      facetId: 'test.com',
      facet: 'sending-domain'
    };
    wrapper = shallow(<HealthScorePageV3 {...props}/>);
  });

  it('renders correctly when receiving data', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
