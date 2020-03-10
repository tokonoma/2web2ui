import React from 'react';
import { shallow } from 'enzyme';

import PlanPicker, { PlanPicker as PlanPickerComponent } from '../PlanPicker';

describe('Plan Picker: ', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      input: { onChange: jest.fn() },
      bundles: [
        {
          bundle: 'free500-0419',
          status: 'public',
          tier: 'test',
          type: 'messaging',
          products: [
            {
              product: 'messaging',
              plan: 'free500-0419',
            },
          ],
          messaging: {
            plan: 'free500-0419',
            product: 'messaging',
            price: 0,
            volume: 500,
          },
        },
        {
          bundle: '2.5M-0817',
          status: 'secret',
          tier: 'premier',
          type: 'messaging',
          products: [
            {
              product: 'messaging',
              plan: '2.5M-0817',
            },
          ],
          messaging: {
            billing_id: '2c92c0f85d7d53d6015d80ed8f2b0ce5',
            plan: '2.5M-0817',
            product: 'messaging',
            price: 899,
            overage: 0.4,
            volume: 2500000,
          },
        },
      ],
    };

    wrapper = shallow(<PlanPicker {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with an initial value', () => {
    const selected = props.bundles[1];
    const selectedProps = { ...props, input: { ...props.input, value: selected } };
    const wrapper = shallow(<PlanPicker {...selectedProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Render Function', () => {
    const subject = subProps => shallow(<PlanPickerComponent {...props} {...subProps} />);

    const renderFn = (wrapper, props = {}) => {
      const Component = wrapper.prop('children');

      return shallow(
        <Component
          getInputProps={jest.fn(props => props)}
          getItemProps={jest.fn(props => props)}
          getToggleButtonProps={jest.fn(props => props)}
          {...props}
        />,
      );
    };

    it('renders', () => {
      const selected = props.bundles[1];

      const wrapper = subject();
      expect(renderFn(wrapper, { selectedItem: selected })).toMatchSnapshot();
    });

    it('renders null if no initial selectedPlan', () => {
      const wrapper = subject();
      expect(renderFn(wrapper)).toBeEmptyRender();
    });

    it('renders null if no plans', () => {
      const selected = {
        code: '4',
        monthly: 400,
        name: 'Four',
        overage: 0.4,
        volume: 4,
      };
      const wrapper = subject({ bundles: [] });
      expect(renderFn(wrapper, { selectedItem: selected })).toBeEmptyRender();
    });
  });
});
