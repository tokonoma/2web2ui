import { shallow } from 'enzyme';
import React from 'react';
import { SendingDomainPage } from '../SendingDomainPage';

jest.mock('src/helpers/analytics');

describe('SendingDomainPage', () => {
  let wrapper;

  const defaultProps = {
    handleSubmit: jest.fn(),
    createDomain: jest.fn(() => Promise.resolve()),
    showAlert: jest.fn(),
    submitting: false,
    submitSucceeded: false,
    history: {
      push: jest.fn(),
    },
  };
  const subject = props => shallow(<SendingDomainPage {...defaultProps} {...props} />);

  beforeEach(() => {
    wrapper = subject();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render submitting state correctly', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call submit function on form submit', () => {
    wrapper.find('form').simulate('submit');
    expect(defaultProps.handleSubmit).toHaveBeenCalled();
  });
});
