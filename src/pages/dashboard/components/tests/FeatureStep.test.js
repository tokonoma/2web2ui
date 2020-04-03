import React from 'react';
import { shallow, mount } from 'enzyme';
import FeaturesStep, { FeaturesStepList } from '../FeaturesStep';
import TestApp from 'src/__testHelpers__/TestApp';
import { useGuideContext } from '../GettingStartedGuide';
import { Button } from 'src/components/matchbox';
jest.mock('../GettingStartedGuide');

describe('FeaturesStep', () => {
  const subject_enzyme = (func = shallow) => func(<FeaturesStep />);
  it('should contain GuideBreadCrumbs', () => {
    expect(subject_enzyme().find('GuideBreadCrumbs')).toHaveLength(1);
  });
  it('should render FeaturesStepList', () => {
    expect(subject_enzyme().find('FeaturesStepList')).toHaveLength(1);
  });
});

describe('FeatureStepList', () => {
  const contextState = { setAndStoreStepName: jest.fn() };
  const subject = (props, func = mount) => {
    useGuideContext.mockReturnValue(contextState);
    return func(
      <TestApp>
        <FeaturesStepList {...props} />
      </TestApp>,
    );
  };
  it('should contain a Card with title Sending with SparkPost', () => {
    const instance = subject();
    expect(instance.find('CardTitle').html()).toContain('Sending with SparkPost');
  });
  it('should call setAndStoreStepName when action button is clicked', () => {
    const instance = subject();
    instance.find(Button).simulate('click');
    expect(contextState.setAndStoreStepName).toHaveBeenCalledWith('Sending');
  });
});
