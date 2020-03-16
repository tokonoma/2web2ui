import { shallow, mount } from 'enzyme';
import React from 'react';
import { RecipientValidationPage } from '../RecipientValidationPage';
import { Launch } from '@sparkpost/matchbox-icons';
import { MemoryRouter } from 'react-router-dom';
jest.mock('src/pages/recipientValidation/components/ValidateSection', () => {
  return function ValidateSection() {
    return <div>ValidateSection</div>;
  };
});
jest.mock('src/pages/recipientValidation/components/SingleAddressForm', () => {
  return {
    SingleAddressTab: () => {
      return <div>SingleAddressForm</div>;
    },
  };
});
describe('Page: Recipient Email Verification', () => {
  let wrapper;
  let defaultProps;

  defaultProps = {
    account: {},
    billing: { credit_card: {} },
    history: {
      replace: jest.fn(),
    },
    getBillingInfo: jest.fn(),
    getBillingSubscription: jest.fn(),
    reset: jest.fn(),
    handleSubmit: jest.fn(),
  };

  const subject = props => shallow(<RecipientValidationPage {...defaultProps} {...props} />);
  const subject_mount = props =>
    mount(
      <MemoryRouter>
        <RecipientValidationPage {...defaultProps} {...props} />
      </MemoryRouter>,
    );
  it('should render Recipient Validation page correctly', () => {
    wrapper = subject();
    expect(wrapper.find('withRouter(Connect(ListForm))')).toExist();
    expect(wrapper.find('Connect(withJobs(JobsTableCollection))')).toExist();
  });

  it('renders single email verification tab correctly when selected', () => {
    wrapper = subject({ tab: 1 });
    expect(wrapper.find('SingleAddressTab')).toExist();
  });

  it('renders Api tab correctly when selected', () => {
    wrapper = subject({ tab: 2 });
    expect(wrapper.find('ApiIntegrationDocs')).toExist();
  });

  it('getBillingInfo and getBillingSubscription is called when Recipient Validation Page mounts', () => {
    wrapper = subject_mount({ tab: 1 });
    expect(defaultProps.getBillingInfo).toHaveBeenCalled();
    expect(defaultProps.getBillingSubscription).toHaveBeenCalled();
  });

  it('when billingLoading is true ValidateSection is not rendered', () => {
    const instance = subject({ billingLoading: true, tab: 1 });
    expect(instance.find('Connect(ValidateSection)')).not.toExist();
  });

  it('renders a API Docs button in Panel when API Integration Tab is selected', () => {
    const instance = subject({ tab: 2 });

    expect(
      instance
        .find('Button')
        .first()
        .prop('children'),
    ).toEqual(['API Docs', <Launch className="LaunchIcon" />]);
  });

  it('renders a ValidateSection', () => {
    const instance = subject({ tab: 2 });
    expect(instance.find('ValidateSection')).toExist();
  });
});
