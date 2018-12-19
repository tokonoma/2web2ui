import { shallow } from 'enzyme';
import React from 'react';
import { SpamTrapsPreview } from '../SpamTrapsPreview';

describe('Signals SpamTrapsPreview Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      facet: 'ip-pool',
      facetId: 'best-pool',
      loading: false,
      gap: 0.5,
      empty: false,
      data: [1,2,3]
    };
    wrapper = shallow(<SpamTrapsPreview {...props}/>);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty correctly', () => {
    wrapper.setProps({ empty: true });
    expect(wrapper).toMatchSnapshot();
  });
});
