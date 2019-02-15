import { shallow } from 'enzyme';
import React from 'react';
import { RecipientValidationPage } from '../RecipientValidationPage';

describe('Page: Recipient Email Verification', () => {
  let wrapper;
  let instance;
  let props;

  beforeEach(() => {
    props = {
      hasRecipientValidation: true
    };
    wrapper = shallow(<RecipientValidationPage {...props}/>);
    instance = wrapper.instance();
  });

  it('should render happy path', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render unhappy path', () => {
    props = {
      hasRecipientValidation: false
    };
    wrapper = shallow(<RecipientValidationPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders single email verification tab correctly when selected', () => {
    wrapper.setState({ selectedTab: 1 });
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleTabs', () => {
    it('changes selected tab correctly', () => {
      expect(wrapper.state().selectedTab).toEqual(0);
      instance.handleTabs(1);
      expect(wrapper.state().selectedTab).toEqual(1);
    });
  });
});
