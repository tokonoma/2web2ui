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
      source: 'raw',
      operator: 'gt',
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

  it('renders week over week metric without operator field', () => {
    wrapper.setProps({ source: 'week_over_week' });
    expect(wrapper).not.toHaveTextContent('Comparison');
  });

  it('renders week over week metric without operator field and grows slider size', () => {
    wrapper.setProps({ source: 'week_over_week' });
    expect(wrapper).not.toHaveTextContent('Comparison');
    expect(wrapper.children().at(1)).toHaveProp('md', 7);
  });

  it('renders monthly sending limit without source and operator fields and grows slider size', () => {
    wrapper.setProps({ metric: 'monthly_sending_limit' });
    expect(wrapper).not.toHaveTextContent('Evaluated');
    expect(wrapper).not.toHaveTextContent('Comparison');
    expect(wrapper.children().at(0)).toHaveProp('md', 10);
  });

  it('changes value field value when slider value changes', () => {
    wrapper.find('Slider').simulate('change', 60);
    expect(props.change).toHaveBeenCalledWith(FORM_NAME, 'value', 60);
  });

  it('changes slider value when value field value changes', () => {
    expect(wrapper.find('Slider').prop('value')).toEqual(50);
    wrapper.setProps({ value: 60 });
    expect(wrapper.find('Slider').prop('value')).toEqual(60);
  });

  it('changes operator to gt when selecting WOW or DOD', () => {
    wrapper.find({ name: 'source' }).simulate('change', { target: { value: 'week_over_week' } });
    expect(props.change).toHaveBeenCalledWith(FORM_NAME, 'operator', 'gt');
  });

  describe('slider recommended tick changes with', () => {
    const formCases = {
      'metric change': {
        prop: { metric: 'block_bounce_rate' },
        recommendedValue: 20,
      },
      'operator change': {
        prop: { metric: 'health_score', source: 'raw', operator: 'gt' },
        recommendedValue: 70,
      },
      'source change': {
        prop: { metric: 'health_score', source: 'week_over_week' },
        recommendedValue: 10,
      },
    };

    cases(
      'should be correct tick',
      ({ prop, recommendedValue }) => {
        wrapper.setProps(prop);
        expect(wrapper.find({ id: 'slider' }).prop('ticks')).toMatchObject({
          [recommendedValue]: 'Recommended',
        });
      },
      formCases,
    );
  });
});
