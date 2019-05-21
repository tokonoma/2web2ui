import React from 'react';

import { shallow } from 'enzyme';

import { RecipientListForm } from '../RecipientListForm';

describe('RecipientListForm', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
      editMode: false,
      autofill: jest.fn(),
      formName: 'fooForm',
      valid: true,
      pristine: true,
      submitting: false
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

  it('should disable submit when form is invalid', () => {
    wrapper.setProps({ pristine: true, valid: false });
    expect(wrapper.find('Button').prop('disabled')).toBe(true);
  });

  it('should disable submit when form is pristine', () => {
    wrapper.setProps({ pristine: true, valid: true });
    expect(wrapper.find('Button').prop('disabled')).toBe(true);
  });

  it('autofills id on name change on create mode', () => {
    wrapper.find('Field[name="name"]').simulate('change', { target: { value: 'FOo bAr' }});
    // expect(wrapper.find('Field[name="id"]').value).toEqual('foo-bar');
    expect(props.autofill).toHaveBeenCalledWith('fooForm', 'id', 'foo-b-ar');
  });

  it('does not autofill id on name change on edit mode', () => {
    wrapper.setProps({ editMode: true });
    wrapper.find('Field[name="name"]').simulate('change', { target: { value: 'FOo bAr' }});
    expect(props.autofill).not.toHaveBeenCalled();
  });
});

