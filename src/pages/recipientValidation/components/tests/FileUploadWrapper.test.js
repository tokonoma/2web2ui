import React from 'react';
import { shallow } from 'enzyme';

import FileUploadWrapper from '../FileUploadWrapper';

const defaults = {
  meta: {},
  input: {}
};

it('renders correctly', () => {
  const wrapper = shallow(<FileUploadWrapper {...defaults} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders and error correctly', () => {
  const wrapper = shallow(<FileUploadWrapper {...defaults} meta={{ error: 'oh no', touched: true }}/>);
  expect(wrapper.find('Error')).toMatchSnapshot();
});

// This is ugly.  It would be better to test the behavior and not the implementation
it('FileUploadWrapper.handleCancel', () => {
  const props = {
    input: {
      onBlur: jest.fn()
    }
  };
  const instance = new FileUploadWrapper(props);

  instance.handleCancel();
  expect(props.input.onBlur).toHaveBeenCalled();
});

// This is ugly.  It would be better to test the behavior and not the implementation
it('FileUploadWrapper.handleDrop', () => {
  const props = {
    input: {
      onBlur: jest.fn(),
      onChange: jest.fn()
    }
  };
  const file = { name: 'test.csv' };
  const instance = new FileUploadWrapper(props);

  instance.handleDrop([file], []);

  expect(props.input.onChange).toHaveBeenCalledWith(file);
  expect(props.input.onBlur).toHaveBeenCalled();
});

// This is ugly.  It would be better to test the behavior and not the implementation
it('FileUploadWrapper.handleOpen', () => {
  const dropzone = {
    open: jest.fn()
  };
  const instance = new FileUploadWrapper({});
  instance.dropzoneRef = dropzone;

  instance.handleOpen();
  expect(dropzone.open).toHaveBeenCalled();
});
