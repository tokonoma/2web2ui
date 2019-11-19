import { shallow } from 'enzyme';
import React from 'react';
import { TrendsChart } from '../TrendsChart';

describe('Inbox Placement Trends Chart', () => {

  const props = {
    hoveredDate: '',
    loading: false,
    error: null,
    hasNoData: false,
    trends: [{
      date: '2019-11-10',
      totalMessages: 10,
      inbox: .5,
      spam: .5,
      missing: 0
    },{
      date: '2019-11-11',
      totalMessages: 40,
      inbox: .8,
      spam: .15,
      missing: .05
    }]
  };

  const subject = (options = {}) => shallow(
    <TrendsChart {...props} {...options} />
  );


  it('renders happy path correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('PanelLoading')).toExist();
  });

  it('renders error correctly', () => {
    const wrapper = subject({ error: { message: 'You Dun Goofed' }});
    expect(wrapper.find('Callout')).toExist();
    expect(wrapper.find('Callout')).toHaveProp('title', 'Unable to Load Trends Data');
    expect(wrapper.find('Callout')).toHaveTextContent('You Dun Goofed');
  });

  it('renders no account level data callout correctly', () => {
    const wrapper = subject({ trends: [], hasNoData: true });
    expect(wrapper.find('Callout')).toExist();
    expect(wrapper.find('Callout')).toHaveTextContent('Inbox Placement Trends Not Available');
  });

  describe('Bars', () => {
    const getShapeFn = (hoveredDate) => {
      const wrapper = subject();
      const changeHovered = wrapper.find('Bar').first().prop('onMouseOver');
      changeHovered({ payload: { date: hoveredDate, totalMessages: 10 }});
      wrapper.update();

      return wrapper.find('Bar').first().prop('shape');
    };

    it('renders hovered bar correctly', () => {
      const shapeFn = getShapeFn('2019-11-10');
      const rectangleComponent = shapeFn({ date: '2019-11-10' });
      expect(rectangleComponent.props.opacity).toEqual(1);
    });

    it('renders un-hovered bar correctly when another bar is hovered', () => {
      const shapeFn = getShapeFn('2019-11-10');
      const rectangleComponent = shapeFn({ date: '2019-11-11' });
      expect(rectangleComponent.props.opacity).toEqual(.5);
    });

    it('renders un-hovered bar correctly when no bar is hovered', () => {
      const shapeFn = getShapeFn('');
      const rectangleComponent = shapeFn({ date: '2019-11-10' });
      expect(rectangleComponent.props.opacity).toEqual(1);
    });

  });
});
