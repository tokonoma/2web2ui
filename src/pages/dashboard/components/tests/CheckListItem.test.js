import React from 'react';
import { shallow } from 'enzyme';
import CheckListItem from '../CheckListItem';
import { useGuideContext } from '../GettingStartedGuide';
jest.mock('../GettingStartedGuide');

describe('CheckListItem', () => {
  const defaultProps = {
    name: 'Testname',
    title: 'Some test title',
    description: 'Some test description',
    action: {},
  };
  const defaultContextState = {
    stepName: 'Show Me SparkPost',
    setAndStoreStepName: jest.fn(),
    setOnboardingAccountOption: jest.fn(),
    send_test_email_completed: false,
    explore_analytics_completed: false,
    invite_collaborator_completed: false,
    hasSendingDomains: false,
    hasApiKeysForSending: false,
    view_developer_docs_completed: false,
    handleAction: jest.fn(),
  };
  const subject = (props, func = shallow) => {
    useGuideContext.mockReturnValue(defaultContextState);
    return func(<CheckListItem {...defaultProps} {...props} />);
  };
  it('should contain GuideListItemTitle with title passed in props', () => {
    expect(
      subject()
        .find('GuideListItemTitle')
        .html(),
    ).toContain(defaultProps.title);
  });
  it('should contain GuideListItemDescription with description passed in props when name is not Invite a Collabrator', () => {
    expect(
      subject()
        .find('GuideListItemDescription')
        .html(),
    ).toContain(defaultProps.description);
  });
  it('should contain description with a UnStyledLink when name is Invite a Collabrator', () => {
    const instance = subject({ name: 'Invite a Collaborator' });
    expect(instance.find('GuideListItemDescription').find('UnstyledLink')).toHaveLength(1);
  });
});
