import React from 'react';

import { shallow } from 'enzyme';

import { ListForm } from '../ListForm';

describe('ListForm', () => {
  let props;
  let formValuesWithCsv;
  let wrapper;

  beforeEach(() => {
    formValuesWithCsv = {
      csv: 'email,foo@address.com\nbar@address.com\n'
    };

    props = {
      handleSubmit: jest.fn((a) => () => a(formValuesWithCsv)),
      uploadList: jest.fn(() => Promise.resolve()),
      reset: jest.fn(),
      showAlert: jest.fn()
    };

    wrapper = shallow(<ListForm {...props} />);
  });

  it('renders correctly', () => {
    wrapper.setProps(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should submit csv', async () => {
    wrapper.setProps({ ...props, file: { size: 45 }});

    const csvUpload = props.uploadList.mock.calls[0][0];
    await expect(props.uploadList).toHaveBeenCalledTimes(1);

    expect(csvUpload).toBeInstanceOf(FormData);
    expect(csvUpload.get('myupload')).toEqual(formValuesWithCsv.csv);
    expect(props.reset).toHaveBeenCalledWith('recipientValidationListForm');
    expect(props.showAlert.mock.calls).toMatchSnapshot();
  });

  it('should not submit csv when over size limit', () => {
    wrapper.setProps({ ...props, file: { size: 200000001 }});
    expect(props.uploadList).not.toHaveBeenCalled();
  });
});
