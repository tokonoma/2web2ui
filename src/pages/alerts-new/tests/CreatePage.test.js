import { shallow } from 'enzyme';
import React from 'react';
import { CreatePage } from '../CreatePage';

describe('Page: Alerts Create', () => {
  const props = {
    createAlert: jest.fn(),
    showAlert: jest.fn(),
    error: null,
    history: [],
    loading: false
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CreatePage {...props} />);
  });

  it('should render happy path', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render error when list fails to load', () => {
    wrapper.setProps({ error: { message: 'this failed' }});
    expect(wrapper.find('ApiErrorBanner')).toMatchSnapshot();
  });
});
