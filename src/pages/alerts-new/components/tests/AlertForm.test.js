import { shallow } from 'enzyme';
import React from 'react';
import { AlertForm } from '../AlertForm';

describe('Alert Form Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      createAbTestDraft: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      history: {
        push: jest.fn()
      },
      loading: false,
      listTemplates: jest.fn()
    };

    wrapper = shallow(<AlertForm {...props} />);
  });

  it('should render the alert form component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
