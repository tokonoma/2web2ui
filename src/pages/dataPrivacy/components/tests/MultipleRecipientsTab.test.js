import React from 'react';
import { shallow } from 'enzyme';
import { RadioGroup } from 'src/components';
import { FileFieldWrapper } from 'src/components/reduxFormWrappers';
import { MultipleRecipientsTab } from '../MultipleRecipientsTab';
describe('Page: Multi Recipients Tab', () => {
  const defaultProps = {
    handleSubmit: jest.fn(),
  };
  const subject = () => {
    return shallow(<MultipleRecipientsTab {...defaultProps} />);
  };

  it('renders correctly', () => {
    const wrapper = subject();
    expect(wrapper.find({ component: RadioGroup, name: 'requestType' })).toExist();
    expect(wrapper.find({ component: FileFieldWrapper, name: 'file' })).toExist();
    expect(wrapper.find('SubaccountSection')).toExist();
  });
});
