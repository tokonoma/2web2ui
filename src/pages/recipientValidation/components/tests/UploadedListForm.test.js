import React from 'react';
import { shallow } from 'enzyme';
import UploadedListForm from '../UploadedListForm';

const subject = (props = {}) => shallow(
  <UploadedListForm
    onSubmit={jest.fn()}
    count={123}
    currentUsage={12345}
  />
);

describe('Uploaded List Form', () => {
  it('should render correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  // it('should call onSubmit when clicking validate button', () => {
  //   const onSubmit = jest.fn();
  //   const wrapper = subject({ onSubmit });
  //   wrapper.find('Button').at(0).simulate('click');
  //   expect(onSubmit).toHaveBeenCalled();
  // });
});
