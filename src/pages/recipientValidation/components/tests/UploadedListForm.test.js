import React from 'react';
import { shallow } from 'enzyme';
import UploadedListForm from '../UploadedListForm';

const subject = (props = {}) => shallow(
  <UploadedListForm
    onSubmit={jest.fn()}
    count={123}
    currentUsage={12345}
    {...props}
  />
);

describe('Uploaded List Form', () => {
  it('should render correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should call onSubmit when clicking validate button', () => {
    const onSubmit = jest.fn();
    const wrapper = subject({ onSubmit });
    wrapper.find('Button').at(0).simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should open modal on click of link', () => {
    const wrapper = subject();
    wrapper.find('UnstyledLink').simulate('click');
    expect(wrapper.state('showPriceModal')).toEqual(true);
  });
});
