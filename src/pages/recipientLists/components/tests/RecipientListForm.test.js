import React from 'react';

import { shallow } from 'enzyme';

import { RecipientListForm } from '../RecipientListForm';

describe('RecipientListForm', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      onSubmit: jest.fn()
    };

    wrapper = shallow(<RecipientListForm {...props} />);
  });

  it('defaults to create mode', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly in create mode', () => {
    wrapper.setProps({ editMode: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders disable id in edit mode', () => {
    wrapper.setProps({ editMode: true });
    expect(wrapper.find('Field[name="id"]').prop('disabled')).toBe(true);
  });

  it('should disable form elements during submit', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper).toMatchSnapshot();
  });
});

