import React from 'react';
import { shallow } from 'enzyme';
import FeaturesStepList from '../FeaturesStepList';

describe('FeatureStepList', () => {
  const defaultProps = {
    setAndStoreStepName: jest.fn(),
  };
  const subject = (props, func = shallow) =>
    func(<FeaturesStepList {...defaultProps} {...props} />);
  it('should contain one Card', () => {
    const instance = subject();
    expect(instance.find('Card')).toHaveLength(1);
  });
  it('should call setAndStoreStepName when action button is clicked', () => {
    const instance = subject();
    instance.find('Button').simulate('click');
    expect(defaultProps.setAndStoreStepName).toHaveBeenCalledWith('Sending');
  });
});
