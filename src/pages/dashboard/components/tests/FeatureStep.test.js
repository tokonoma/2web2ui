import React from 'react';
import { shallow } from 'enzyme';
import { FeaturesStepList } from '../FeaturesStep';
import { useGuideContext } from '../GettingStartedGuide';

jest.mock('../GettingStartedGuide');

describe('FeatureStepList', () => {
  const contextState = { setAndStoreStepName: jest.fn() };
  const subject = (props, func = shallow) => {
    useGuideContext.mockReturnValue(contextState);
    return func(<FeaturesStepList {...props} />);
  };
  it('should contain one Card', () => {
    const instance = subject();
    expect(instance.find('Card')).toHaveLength(1);
  });
  it('should call setAndStoreStepName when action button is clicked', () => {
    const instance = subject();
    instance.find('Button').simulate('click');
    expect(contextState.setAndStoreStepName).toHaveBeenCalledWith('Sending');
  });
});
