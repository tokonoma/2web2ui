import { shallow } from 'enzyme';
import React from 'react';
import { WithDateSelection } from '../withDateSelection';

describe('Signals Spam Trap Details Container', () => {
  const Component = () => <div>test</div>;
  const props = {
    component: Component,
    data: []
  };

  const subject = (options) => shallow(<WithDateSelection {...props} {...options} />);

  it('should set date if provided one', () => {
    const wrapper = subject({ selected: '2015-01-01' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should use the last date when not given a date', () => {
    const wrapper = subject();
    wrapper.setProps({ data: [{ date: '2015-01-01' }, { date: '2999-99-99' }]});
    expect(wrapper).toHaveProp('selectedDate', '2999-99-99');
  });

  it('should use the last date if date does not exist in data', () => {
    const wrapper = subject({ selected: 'not-in-data' });
    wrapper.setProps({ data: [{ date: '2015-01-01' }, { date: '2999-99-99' }]});
    expect(wrapper).toHaveProp('selectedDate', '2999-99-99');
  });

  it('should not use last date if provided date is in data', () => {
    const wrapper = subject({ selected: '2015-01-01' });
    wrapper.setProps({ data: [{ date: '2015-01-01' }, { date: '2999-99-99' }]});
    expect(wrapper).toHaveProp('selectedDate', '2015-01-01');
  });

  it('handles date select for a new date', () => {
    const wrapper = subject({ data: [{ date: '2015-01-01' }, { date: '2999-99-99' }]});
    wrapper.prop('handleDateSelect')({ payload: { date: '2015-01-01' }});
    expect(wrapper).toHaveProp('selectedDate', '2015-01-01');
    expect(wrapper).toHaveProp('shouldHighlightSelected', true);
  });

  it('handles date select for un-selecting the already selected date by defaulting to last date', () => {
    const wrapper = subject({ data: [{ date: '2015-01-01' }, { date: '2999-99-99' }]});
    wrapper.setState({ selectedDate: '2015-01-01', shouldHighlightSelected: true });
    wrapper.prop('handleDateSelect')({ payload: { date: '2015-01-01' }});
    expect(wrapper).toHaveProp('selectedDate', '2999-99-99');
  });

  it('handles date select for un-selecting the already selected date by resetting shouldHighlightSelected & hovered', () => {
    const wrapper = subject({ data: [{ date: '2015-01-01' }, { date: '2999-99-99' }]});
    wrapper.setState({ selectedDate: '2015-01-01', shouldHighlightSelected: true });
    wrapper.prop('handleDateSelect')({ payload: { date: '2015-01-01' }});
    expect(wrapper).toHaveProp('shouldHighlightSelected', false);
    expect(wrapper).toHaveProp('hoveredDate', null);
  });

  it('handles date hover', () => {
    const wrapper = subject({ data: [{ date: '2015-01-02' }, { date: '2999-99-99' }]});
    wrapper.prop('handleDateHover')({ payload: { date: '2015-01-02' }});
    expect(wrapper).toHaveProp('hoveredDate', '2015-01-02');
  });
});
