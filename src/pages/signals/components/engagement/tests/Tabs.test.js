import { shallow } from 'enzyme';
import React from 'react';
import { Tabs } from '../Tabs';

describe('Engagement Tabs Component', () => {
  let push;

  beforeEach(() => {
    push = jest.fn();
  });

  const subject = (props) => shallow(<Tabs {...props} />);

  it('renders correctly', () => {
    const wrapper = subject({ location: { pathname: '/signals/engagement/complaints/1/2' }});
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle select', () => {
    const wrapper = subject({
      facet: 'mockFacet',
      facetId: 'mockId',
      location: { pathname: '/signals/engagement/complaints/1/2' },
      history: { push }
    });

    wrapper.find('Tabs').prop('onSelect')(1);
    expect(push).toHaveBeenCalledWith('/signals/engagement/engagement-rate/mockFacet/mockId');
  });
});
