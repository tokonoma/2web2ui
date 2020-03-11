import { shallow } from 'enzyme';
import React from 'react';
import { RecipientValidationPage } from '../RecipientValidationPage';
import { Launch } from '@sparkpost/matchbox-icons';

describe('Page: Recipient Email Verification', () => {
  let wrapper;
  let defaultProps;

  defaultProps = {
    history: {
      replace: jest.fn(),
    },
    getBillingInfo: jest.fn(),
    getBillingSubscription: jest.fn(),
    billing: {},
    reset: jest.fn(),
    handleSubmit: jest.fn(),
  };

  const subject = props => shallow(<RecipientValidationPage {...defaultProps} {...props} />);

  it('should render Recipient Validation page correctly', () => {
    wrapper = subject();
    expect(wrapper.find('withRouter(Connect(ListForm))')).toExist();
    expect(wrapper.find('Connect(withJobs(JobsTableCollection))')).toExist();
  });

  it('renders single email verification tab correctly when selected', () => {
    wrapper = subject();
    wrapper.setState({ selectedTab: 1 });
    expect(wrapper.find('withRouter(Connect(SingleAddressForm))')).toExist();
  });

  it('renders Api tab correctly when selected', () => {
    wrapper = subject();
    wrapper.setState({ selectedTab: 2 });
    expect(wrapper.find('ApiIntegrationDocs')).toExist();
  });

  it('getBillingInfo and getBillingSubscription is called when Recipient Validation Page mounts', () => {
    wrapper = subject().instance();
    wrapper.setState({ selectedTab: 1 });
    expect(defaultProps.getBillingInfo).toHaveBeenCalled();
    expect(defaultProps.getBillingSubscription).toHaveBeenCalled();
  });

  it('when billingLoading is true ValidateSection is not rendered', () => {
    const instance = subject({ billingLoading: true });
    instance.setState({ selectedTab: 1 });
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
    expect(instance.find('Connect(ValidateSection)')).toExist();
  });

  it('changes selected tab correctly', () => {
    wrapper = subject();
    expect(wrapper.state().selectedTab).toEqual(0);
    wrapper.instance().handleTabs(1);
    expect(wrapper.state().selectedTab).toEqual(1);
  });
});
