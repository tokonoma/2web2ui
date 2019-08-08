import React from 'react';
import { shallow } from 'enzyme';
import { PendingCancelGlobalBanner } from '../PendingCancelGlobalBanner';


describe('PendingCancelGlobalBanner', () => {

  const mockFunctions = {
    renewAccount: jest.fn(() => Promise.resolve()),
    showAlert: jest.fn(),
    hideGlobalBanner: jest.fn(),
    fetchAccount: jest.fn()
  };

  const subject = (props = {}) => shallow(
    <PendingCancelGlobalBanner
      account={{ pending_cancellation: { effective_date: '2019-09-07T08:00:00.000Z' }}}
      {...mockFunctions}
      {...props}
    />
  );

  it('should render', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should call renewAccount, showAlert, and fetcAccount on renewAccount', async () => {
    const wrapper = subject();
    await wrapper.find('Button').at(0).simulate('click');
    expect(mockFunctions.renewAccount).toHaveBeenCalled();
    expect(mockFunctions.showAlert).toHaveBeenCalled();
    expect(mockFunctions.fetchAccount).toHaveBeenCalled();
  });

  it('should call hideGlobalBanner on clicking close', () => {
    const wrapper = subject();
    wrapper.find('Button').at(1).simulate('click');
    expect(mockFunctions.hideGlobalBanner).toHaveBeenCalled();
  });



});
