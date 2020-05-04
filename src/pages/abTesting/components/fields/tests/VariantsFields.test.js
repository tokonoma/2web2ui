import { shallow } from 'enzyme';
import React from 'react';
import VariantsFields, { RenderVariants, PercentField, SampleSizeField } from '../VariantsFields';
import styles from './VariantsFields.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/hooks/useHibanaOverride');

jest.mock('src/context/HibanaContext');

describe('Variants Fields Component', () => {
  beforeEach(() => {
    useHibanaOverride.mockImplementationOnce(() => styles);
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
  });
  let defaultProps = {
    diabled: false,
    formValues: {},
  };
  const subject = props => shallow(<VariantsFields {...defaultProps} {...props} />);

  it('should render percent audience selection correctly', () => {
    let wrapper = subject({ formValues: { audience_selection: 'percent' } });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render sample size audience selection correctly', () => {
    let wrapper = subject({ formValues: { audience_selection: 'sample_size' } });
    expect(wrapper).toMatchSnapshot();
  });

  describe('Field Array', () => {
    let fieldArrayProps;

    beforeEach(() => {
      const fieldsSyntheticArray = (() => {
        const a = ['variant[1]', 'variant[2]'];
        a.push = jest.fn();
        a.remove = jest.fn();
        return a;
      })();

      fieldArrayProps = {
        fields: fieldsSyntheticArray,
        formValues: {
          audience_selection: 'percent',
        },
        disabled: false,
      };
    });

    const subject = props => shallow(<RenderVariants {...fieldArrayProps} {...props} />);

    it('should render fields correctly with percent fields', () => {
      const wrapper = subject();
      expect(wrapper).toMatchSnapshot();
    });

    it('should render 1 field with disabled remove button', () => {
      fieldArrayProps.fields.pop();
      const wrapper = subject(<RenderVariants {...fieldArrayProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render 20 fields with disabled add button', () => {
      fieldArrayProps.fields.length = 20;
      const wrapper = subject(<RenderVariants {...fieldArrayProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render fields correctly with sample size fields', () => {
      const wrapper = subject({ formValues: { audience_selection: 'sample_size' } });
      expect(wrapper).toMatchSnapshot();
    });

    it('should handle add', () => {
      const wrapper = subject(<RenderVariants {...fieldArrayProps} />);
      wrapper
        .find('Button')
        .last()
        .simulate('click');
      expect(fieldArrayProps.fields.push).toHaveBeenCalled();
    });

    it('should handle remove', () => {
      const wrapper = subject(<RenderVariants {...fieldArrayProps} />);
      wrapper
        .find('Button')
        .first()
        .simulate('click');
      expect(fieldArrayProps.fields.remove).toHaveBeenCalledWith(0);
    });
  });

  describe('Percent Field', () => {
    it('should render correctly', () => {
      expect(
        shallow(<PercentField namespace="default_template" disabled={false} />),
      ).toMatchSnapshot();
    });
  });

  describe('Sample Size Field', () => {
    it('should render correctly', () => {
      expect(
        shallow(<SampleSizeField namespace="default_template" disabled={false} />),
      ).toMatchSnapshot();
    });
  });
});
