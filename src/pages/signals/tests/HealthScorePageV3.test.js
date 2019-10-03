import { shallow } from 'enzyme';
import React from 'react';
import { HealthScorePageV3 } from '../HealthScorePageV3';

describe('Signals Health Score Page V3', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      data: [],
      facetId: 'test.com',
      facet: 'sending-domain'
    };
    wrapper = shallow(<HealthScorePageV3 {...props}/>);
  });

  it('renders correctly when receiving data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Panel').find('Loading')).toExist();
    expect(wrapper.find('HSMetric')).not.toExist();
  });

  it('renders empty correctly', () => {
    wrapper.setProps({ empty: true });
    expect(wrapper.find('Panel').find('Callout')).toHaveProp('title', 'No Data Available');
    expect(wrapper.find('HSMetric')).not.toExist();
  });

  it('renders error correctly', () => {
    wrapper.setProps({ error: { message: 'error message' }});
    expect(wrapper.find('Panel').find('Callout')).toHaveProp('title', 'Unable to Load Data');
    expect(wrapper.find('HSMetric')).not.toExist();
  });
});
