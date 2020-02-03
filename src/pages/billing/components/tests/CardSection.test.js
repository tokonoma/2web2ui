import React from 'react';
import { shallow } from 'enzyme';
import CardSection from '../CardSection';
import { useFeatureChangeContext } from 'src/pages/billing/context/FeatureChangeContext';

jest.mock('src/pages/billing/context/FeatureChangeContext');

describe('CardSection', () => {
  const defaultContextState = {
    isReady: true,
    loading: false,
  };
  const subject = (props = {}, contextState = {}) => {
    useFeatureChangeContext.mockReturnValue({
      ...defaultContextState,
      ...contextState,
    });
    const defaultProps = {
      countries: [],
      currentPlan: {},
      selectedPlan: {},
      useSavedCC: true,
      handleCardToggle: jest.fn(),
      account: {
        billing: {},
      },
    };
    return shallow(<CardSection {...defaultProps} {...props} />);
  };

  it('should render null if selected plan is free', () => {
    const wrapper = subject({ selectedPlan: { isFree: true } });
    expect(wrapper.type()).toBe(null);
  });
  it('should render nothing if context state is not ready and changePlanForrm is new', () => {
    const wrapper = subject({ isNewChangePlanForm: true }, { isReady: false });
    expect(wrapper.find('Panel')).not.toExist();
  });
  it('should render nothing if context state is loading and changePlanForrm is new', () => {
    const wrapper = subject(
      { isNewChangePlanForm: true },
      { loading: true, isNewChangePlanForm: true },
    );
    expect(wrapper.find('Panel')).not.toExist();
  });
  it('should render CreditCardSection on plan is not free, context state is ready and not loading and changePlanForrm is new ', () => {
    const wrapper = subject({ account: {} });
    expect(wrapper.find('CreditCardSection')).toExist();
  });
});
