import React from 'react';
import { mount } from 'enzyme';
import SliderFieldWrapper from '../SliderFieldWrapper';

describe('SliderFieldWrapper', () => {
  const subject = ({ input, ...props } = {}) =>
    mount(
      <SliderFieldWrapper
        id="testSlider"
        input={{ onChange: () => {}, ...input }}
        label="Test Slider"
        {...props}
      />,
    );

  it('renders with a label', () => {
    expect(subject()).toHaveTextContent('Test Slider');
  });

  it('renders disabled slider and text field', () => {
    const wrapper = subject({ disabled: true });

    expect(wrapper.find('Slider')).toHaveProp('disabled', true);
    expect(wrapper.find('TextField')).toHaveProp('disabled', true);
  });

  it('cleans, clamps, reports, and updates value on blur', () => {
    const onChange = jest.fn();
    const wrapper = subject({ input: { onChange, value: 50 }, precision: 1 });

    wrapper.find('TextField').prop('onBlur')({ target: { value: 55.55555 } });
    wrapper.update(); // because simulate didn't work

    expect(onChange).toHaveBeenCalledWith(55.6);
    expect(wrapper.find('TextField')).toHaveProp('value', 55.6);
  });

  it('rerenders with raw input value', () => {
    const wrapper = subject();
    const invalidValue = 666;

    wrapper.find('TextField').prop('onChange')({ target: { value: invalidValue } });
    wrapper.update(); // because simulate didn't work

    expect(wrapper.find('Slider')).toHaveProp('value', undefined);
    expect(wrapper.find('TextField')).toHaveProp('value', invalidValue);
  });

  it('rerenders when value is updated', () => {
    const wrapper = subject({ input: { value: 45 } });

    expect(wrapper.find('Slider')).toHaveProp('value', 45);
    expect(wrapper.find('TextField')).toHaveProp('value', 45);

    wrapper.setProps({ input: { value: 79 }, onChange: jest.fn() });
    wrapper.update();

    expect(wrapper.find('Slider')).toHaveProp('value', 79);
    expect(wrapper.find('TextField')).toHaveProp('value', 79);
  });
});
