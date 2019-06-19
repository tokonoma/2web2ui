import { shallow } from 'enzyme';
import React from 'react';
import { RecipientValidationPage } from '../RecipientValidationPage';
import ListForm from '../components/ListForm';
import SingleAddressForm from '../components/SingleAddressForm';
import ListResults from '../components/ListResults';
import ApiDetails from '../components/ApiDetails';

describe('Page: Recipient Email Verification', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<RecipientValidationPage/>);
    instance = wrapper.instance();
  });

  it('should render Recipient Validation page correctly', () => {
    expect(wrapper.find(ListForm)).toExist();
    expect(wrapper.find(ListResults)).toExist();
  });

  it('renders single email verification tab correctly when selected', () => {
    wrapper.setState({ selectedTab: 1 });
    expect(wrapper.find(SingleAddressForm)).toExist();
  });

  it('renders Api tab correctly when selected', () => {
    wrapper.setState({ selectedTab: 2 });
    expect(wrapper.find(ApiDetails)).toExist();
  });

  describe('handleTabs', () => {
    it('changes selected tab correctly', () => {
      expect(wrapper.state().selectedTab).toEqual(0);
      instance.handleTabs(1);
      expect(wrapper.state().selectedTab).toEqual(1);
    });
  });
});
