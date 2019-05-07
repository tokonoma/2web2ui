import React from 'react';
import { shallow } from 'enzyme';

import PlanPicker, { PlanPicker as PlanPickerComponent } from '../PlanPicker';

describe('Plan Picker: ', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    const plansByTier = {
      'default': [{
        code: '1',
        includesIp: true,
        monthly: 100,
        name: 'One',
        overage: 0.1,
        volume: 1
      }],
      'test': [{
        code: '2',
        includesIp: false,
        monthly: 0,
        name: 'Two',
        overage: 0.2,
        volume: 2,
        isFree: true
      }],
      'starter': [{
        code: '3',
        monthly: 300,
        name: 'Three',
        overage: 0.3,
        volume: 3
      }]
    };

    props = {
      input: { onChange: jest.fn() },
      plansByTier
    };

    wrapper = shallow(<PlanPicker {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with an initial value', () => {
    const selected = {
      code: '4',
      monthly: 400,
      name: 'Four',
      overage: 0.4,
      volume: 4
    };
    const selectedProps = { ...props, input: { ...props.input, value: selected }};
    const wrapper = shallow(<PlanPicker {...selectedProps} />);
    expect(wrapper).toMatchSnapshot();
  });


  describe('Render Function', () => {

    const subject = (subProps) => shallow(<PlanPickerComponent {...props} {...subProps}/>);

    const renderFn = (wrapper, props = {}) => {
      const Component = wrapper.prop('children');

      return shallow(
        <Component
          getInputProps={jest.fn((props) => props)}
          getItemProps={jest.fn((props) => props)}
          getToggleButtonProps={jest.fn((props) => props)}
          {...props}
        />
      );
    };

    it('renders', () => {
      const selected = {
        code: '4',
        monthly: 400,
        name: 'Four',
        overage: 0.4,
        volume: 4
      };

      const wrapper = subject();

      const thing = renderFn(wrapper, { selectedItem: selected });
      expect(thing).toMatchSnapshot();
    });
  });


});
