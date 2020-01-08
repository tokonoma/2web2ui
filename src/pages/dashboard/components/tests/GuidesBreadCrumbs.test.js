import React from 'react';
import { shallow } from 'enzyme';
import GuideBreadCrumbs from '../GuideBreadCrumbs';
import { useGuideContext } from '../GettingStartedGuide';
jest.mock('../GettingStartedGuide');

describe('GuideBreadCrumbs', () => {
  const contextState = { stepName: 'Show Me SparkPost', setAndStoreStepName: jest.fn() };
  const subject = (props, func = shallow) => {
    useGuideContext.mockReturnValue(contextState);
    return func(<GuideBreadCrumbs {...props} />);
  };
  it('should call setAndStorefunction when a BreadCrumbsItem is clicked', () => {
    const instance = subject();
    instance
      .find('BreadCrumbsItem')
      .first()
      .simulate('click');
    expect(contextState.setAndStoreStepName).toHaveBeenCalled();
  });
  it('should render BreadCrumbsItem active depending on StepName', () => {
    const instance = subject();
    expect(
      instance.findWhere(n => n.prop('children') === 'Show Me SparkPost').prop('active'),
    ).toBeTruthy();
  });
});
