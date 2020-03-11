import React from 'react';
import { shallow, mount } from 'enzyme';
import { UploadedListForm } from '../UploadedListForm';

describe('UploadedListForm', () => {
  const subject = (props = {}, method = shallow) =>
    method(
      <UploadedListForm
        currentUsage={12345}
        getUsage={jest.fn()}
        job={{
          filename: 'big-test.csv',
          addressCount: 123,
        }}
        onSubmit={() => {}}
        {...props}
      />,
    );

  it('should render correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should call getUsage on mount', () => {
    const getUsage = jest.fn();
    subject({ getUsage }, mount);
    expect(getUsage).toHaveBeenCalled();
  });

  it('should open modal on click of link', async () => {
    const wrapper = subject();
    await wrapper.find('UnstyledLink').simulate('click');
    expect(wrapper.find('RVPriceModal')).toHaveProp('isOpen', true);
  });

  it('should render cost loader', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('.LoadingCostContainer')).toExist();
  });
});
