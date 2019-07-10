import { shallow } from 'enzyme';
import React from 'react';
import cases from 'jest-in-case';
import { EvaluatorFields } from '../EvaluatorFields';
import { FORM_NAME } from '../../../constants/formConstants';

describe('Evaluator Fields Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      metric: 'health_score',
      disabled: false,
      change: jest.fn(),
      value: 50,
      source: 'raw'
    };

    wrapper = shallow(<EvaluatorFields {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render source if it is only 1 option', () => {
    wrapper.setProps({ metric: 'block_bounce_rate' });
    expect(wrapper.find({ name: 'source' })).not.toExist();
  });

  it('does not render operator if it is only 1 option', () => {
    wrapper.setProps({ source: 'week_over_week' });
    expect(wrapper.find({ name: 'operator' })).not.toExist();
  });

  it('does not render operator nor source if they each only have 1 option', () => {
    wrapper.setProps({ metric: 'monthly_sending_limit' });
    expect(wrapper.find({ name: 'source' })).not.toExist();
    expect(wrapper.find({ name: 'operator' })).not.toExist();
  });

  describe('slider length with', () => {

    const formCases = {
      'no source size': {
        prop: { metric: 'block_bounce_rate' },
        length: 8
      },
      'no operator size': {
        prop: { source: 'week_over_week' },
        length: 7
      },
      'no source nor operator size': {
        prop: { metric: 'monthly_sending_limit' },
        length: 10
      }
    };

    cases('should be the correct size', ({ prop, length }) => {
      wrapper.setProps(prop);
      expect(wrapper.find({ id: 'sliderColumn' }).prop('md')).toEqual(length);
    }, formCases);
  });

  it('changes value field value when slider value changes', () => {
    wrapper.find('Slider').simulate('change', 60);
    expect(props.change).toHaveBeenCalledWith(FORM_NAME, 'value', 60);
  });

  it('changes slider value when value field value changes', () => {
    expect(wrapper.find('Slider').prop('value')).toEqual(50);
    wrapper.find({ name: 'value' }).simulate('change', { target: { value: 60 }});
    expect(wrapper.find('Slider').prop('value')).toEqual(60);
  });

  it('changes operator to gt when selecting WOW or DOD', () => {
    wrapper.find({ name: 'source' }).simulate('change', { target: { value: 'week_over_week' }});
    expect(props.change).toHaveBeenCalledWith(FORM_NAME, 'operator', 'gt');
  });
});
