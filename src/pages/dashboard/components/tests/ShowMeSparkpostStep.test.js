import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import ShowMeSparkpostStep from '../ShowMeSparkpostStep';
import { GuideContext } from '../GettingStartedGuide';

describe('ShowMeSparkpostStep', () => {
  const subject_enzyme = (func = shallow) => func(<ShowMeSparkpostStep />);
  const subject_rtl = (func = render) => {
    const values = {
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

    return func(
      <GuideContext.Provider value={values}>
        <ShowMeSparkpostStep />
      </GuideContext.Provider>,
    );
  };
  it('should render breadcrumbs', () => {
    expect(subject_enzyme().find('GuideBreadCrumbs')).toHaveLength(1);
  });
  it('should render Checklist with title Send Test Email', () => {
    const { queryByText } = subject_rtl(render);
    expect(queryByText('Send a Test Email')).toBeInTheDocument();
  });
  it('should render Checklist with title Explore Analytics', () => {
    const { queryAllByText } = subject_rtl(render);
    expect(queryAllByText('Explore Analytics')[0]).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
  it('should render Checklist with title Invite a Collaborator', () => {
    const { queryByText } = subject_rtl(render);
    expect(queryByText('Invite a Collaborator')).toBeInTheDocument();
  });
});
