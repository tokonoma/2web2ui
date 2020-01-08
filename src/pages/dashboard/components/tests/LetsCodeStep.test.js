import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import LetsCodeStep from '../LetsCodeStep';
import { GuideContext } from '../GettingStartedGuide';

describe('LetsCodeStep', () => {
  const subject_enzyme = (func = shallow) => func(<LetsCodeStep />);
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
        <LetsCodeStep />
      </GuideContext.Provider>,
    );
  };
  it('should render breadcrumbs', () => {
    expect(subject_enzyme().find('GuideBreadCrumbs')).toHaveLength(1);
  });
  it('should render Checklist with title Add Sending Domain', () => {
    const { queryByText } = subject_rtl(render);
    expect(queryByText('Add Sending Domain')).toBeInTheDocument();
  });
  it('should render Checklist with title Generate API Key', () => {
    const { queryAllByText } = subject_rtl(render);
    expect(queryAllByText('Generate API Key')[0]).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
  it('should render Checklist with title View Developer Docs', () => {
    const { queryByText } = subject_rtl(render);
    expect(queryByText('View Developer Docs')).toBeInTheDocument();
  });
});
