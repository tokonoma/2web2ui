import React from 'react';
import SubmitSection from '../SubmitSection';
import { shallow } from 'enzyme';
import { useFeatureChangeContext } from '../../context/FeatureChangeContext';

jest.mock('../../context/FeatureChangeContext');

describe('SubmitSection: ', () => {
  const defaultProps = {
    freePlan: {
      code: 'free-500',
    },
  };
  const subject = (props = {}, contextState = {}) => {
    useFeatureChangeContext.mockReturnValue({
      ...contextState,
    });
    return shallow(<SubmitSection {...defaultProps} {...props} />);
  };

  it('should render if context state isReady', () => {
    const wrapper = subject();

    expect(wrapper.find('Button')).toExist();
  });

  it('should render nothing if context state is loading', () => {
    const wrapper = subject({}, { loading: true });
    expect(wrapper.find('Button')).not.toExist();
  });

  it('should render the button with type button and redirects to /plan/change if downgrade to free is happening', () => {
    const wrapper = subject({ isDowngradeToFree: true });
    expect(wrapper.find('Button').prop('type')).toBe('button');
    expect(wrapper.find('Button').prop('to')).toBe(
      `/account/billing/plan/change?immediatePlanChange=${defaultProps.freePlan.code}`,
    );
  });

  it('should render the button with type submit and to is null if downgrade to free is not happening', () => {
    const wrapper = subject({ isDowngradeToFree: false });
    expect(wrapper.find('Button').prop('type')).toBe('submit');
    expect(wrapper.find('Button').prop('to')).toBe(null);
  });
});
