import React from 'react';
import { shallow } from 'enzyme';
import ActionsModal from '../ActionsModal';

describe('ActionsModal', () => {
  const subject = (props = {}) => shallow(
    <ActionsModal
      actions={[{ content: 'Do It', onClick: () => {} }]}
      content="Modal Content"
      title="Modal Title"
      {...props}
    />
  );

  it('renders hidden modal', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders open modal', () => {
    expect(subject({ isOpen: true })).toHaveProp('open', true);
  });

  it('calls onCancel when closed', () => {
    const onCancel = jest.fn();
    const wrapper = subject({ onCancel });

    wrapper.simulate('close');

    expect(onCancel).toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = jest.fn();
    const wrapper = subject({ onCancel });

    wrapper
      .find('Button[name="action-cancel-modal-button"]')
      .simulate('click');

    expect(onCancel).toHaveBeenCalled();
  });

  it('renders loader', () => {
    const wrapper = subject({ isLoading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('calls onClick when action is clicked', () => {
    const onClick = jest.fn();
    const wrapper = subject({ actions: [{ content: 'Example', onClick }]});

    wrapper.find('Button[primary=true]').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('renders disabled buttons when confirming', () => {
    const wrapper = subject({ isConfirming: true });
    expect(wrapper.find('Button[disabled=true]')).toHaveLength(1);
  });
});
