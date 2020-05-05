import React from 'react';
import { shallow } from 'enzyme';
import {
  OGSendingStep,
  HibanaSendingStep,
  SendingStepList,
  OGSendingStepListItem,
  HibanaSendingStepListItem,
} from '../SendingStep';
import { SENDING_STEP_LIST } from 'src/pages/dashboard/constants';
import { useGuideContext } from '../GettingStartedGuide';

jest.mock('../GettingStartedGuide');

describe('SendingStep', () => {
  useGuideContext.mockReturnValue({ stepName: 'Sending', setAndStoreStepName: jest.fn() });

  it('should match snapshot', () => {
    expect(shallow(<OGSendingStep />)).toMatchSnapshot();
    expect(shallow(<HibanaSendingStep />)).toMatchSnapshot();
  });
});

describe('SendingStepList', () => {
  const subject = (func = shallow) => {
    useGuideContext.mockReturnValue({ setAndStoreStepName: jest.fn() });
    return func(<SendingStepList />);
  };

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

  it('should call setAndStoreStepName when action button is clicked', () => {
    const OGInstance = shallow(<OGSendingStepListItem {...defaultProps} />);

    OGInstance.find('Button').simulate('click');
    expect(defaultProps.setAndStoreStepName).toHaveBeenCalledWith(defaultProps.name);
  });

  it('should call setAndStoreStepName when action button is clicked in hibana', () => {
    const hibanaInstance = shallow(<HibanaSendingStepListItem {...defaultProps} />);

    hibanaInstance.find('Button').simulate('click');
    expect(defaultProps.setAndStoreStepName).toHaveBeenCalledWith(defaultProps.name);
  });
});
