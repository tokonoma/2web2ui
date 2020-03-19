import React from 'react';
import { shallow } from 'enzyme';
import { RadioGroup, TextFieldWrapper } from 'src/components';
import { SingleRecipientTab } from '../SingleRecipientTab';
describe('Page: Single Recipient Tab', () => {
  const defaultProps = {
    handleSubmit: jest.fn(),
  };
  const subject = () => {
    return shallow(<SingleRecipientTab {...defaultProps} />);
  };

  it('renders correctly', () => {
    const wrapper = subject();
    expect(wrapper.find({ component: RadioGroup, name: 'requestType' })).toExist();
    expect(wrapper.find({ component: TextFieldWrapper, name: 'email' })).toExist();
    expect(wrapper.find('SubaccountSection')).toExist();
  });
});
