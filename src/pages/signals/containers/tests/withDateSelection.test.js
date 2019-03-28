import { shallow } from 'enzyme';
import React from 'react';
import { WithDateSelection } from '../withDateSelection';
// import _ from 'lodash';

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

  it('handles date select', () => {
    const wrapper = subject({ data: [{ date: '2015-01-01' }, { date: '2999-99-99' }]});
    wrapper.prop('handleDateSelect')({ payload: { date: '2015-01-01' }});
    expect(wrapper).toHaveProp('selectedDate', '2015-01-01');
  });

  it('handles date hover', () => {
    const wrapper = subject({ data: [{ date: '2015-01-02' }, { date: '2999-99-99' }]});
    wrapper.prop('handleDateHover')({ payload: { date: '2015-01-02' }});
    expect(wrapper).toHaveProp('hoveredDate', '2015-01-02');
  });
});
