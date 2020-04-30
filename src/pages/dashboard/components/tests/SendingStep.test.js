import React from 'react';
import { shallow } from 'enzyme';
import SendingStep, {
  SendingStepList,
  OGSendingStepListItem,
  HibanaSendingStepListItem,
} from '../SendingStep';
import { SENDING_STEP_LIST } from 'src/pages/dashboard/constants';
import { useGuideContext } from '../GettingStartedGuide';

jest.mock('../GettingStartedGuide');

describe('SendingStep', () => {
  useGuideContext.mockReturnValue({ stepName: 'Sending', setAndStoreStepName: jest.fn() });
  const subject = (func = shallow) => {
    return func(<SendingStep />);
  };
  it('should contain GuideBreadCrumbs', () => {
    expect(subject().find('GuideBreadCrumbs')).toHaveLength(1);
  });

  it('should contain SendingStepList', () => {
    expect(subject().find('SendingStepList')).toHaveLength(1);
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
