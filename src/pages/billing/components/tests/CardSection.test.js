import React from 'react';
import { shallow } from 'enzyme';
import CardSection from '../CardSection';
import { useFeatureChangeContext } from 'src/pages/billing/context/FeatureChangeContext';

jest.mock('src/pages/billing/context/FeatureChangeContext');

describe('CardSection',() => {
  const subject = (props) => {
    useFeatureChangeContext.mockReturnValue({
      isReady: true,
      loading: false
    });
    const defaultProps = {
      countries: [],
      currentPlan: {},
      selectedPlan: {},
      account: {
        billing: {}
      }
    };
    return shallow(<CardSection {...defaultProps} {...props} />);
  };

  it('should render null if selected plan is free', () => {
    const wrapper = subject({ selectedPlan: { isFree: true }});
    expect(wrapper.type()).toBe(null);
  });


  it('should render payment form if no billing info', () => {
    const wrapper = subject({ account: {}});
    expect(wrapper.find('CardSummary')).not.toExist();
    expect(wrapper.find('Connect(PaymentForm)')).toExist();
  });

});

