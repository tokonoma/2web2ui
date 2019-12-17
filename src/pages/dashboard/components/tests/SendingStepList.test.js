import React from 'react';
import { shallow } from 'enzyme';
import SendingStepList, { SendingStepListItem } from '../SendingStepList';
import { SENDING_STEP_LIST } from 'src/pages/dashboard/constants';

describe('SendingStepList', () => {
  const defaultProps = {
    setAndStoreStepName: jest.fn(),
  };

  const subject = (props, func = shallow) => func(<SendingStepList {...defaultProps} {...props} />);

  it('Sending Step contains two items', () => {
    const instance = subject();
    expect(instance.find('SendingStepListItem')).toHaveLength(2);
  });
});

describe('SendingListItem', () => {
  const defaultProps = {
    setAndStoreStepName: jest.fn(),
    ...SENDING_STEP_LIST['Show Me SparkPost'],
  };

  const subject = (props, func = shallow) =>
    func(<SendingStepListItem {...defaultProps} {...props} />);

  it('should call setAndStoreStepName when action button is clicked', () => {
    const instance = subject();
    instance.find('Button').simulate('click');
    expect(defaultProps.setAndStoreStepName).toHaveBeenCalledWith(defaultProps.name);
  });
});
