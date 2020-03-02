import React, { useState, createContext, useContext } from 'react';
import { Panel } from '@sparkpost/matchbox';
import { ArrowDownward } from '@sparkpost/matchbox-icons';
import { GUIDE_IDS } from '../constants';
import SendingStep from './SendingStep';
import ShowMeSparkpostStep from './ShowMeSparkpostStep';
import LetsCodeStep from './LetsCodeStep';

export const GuideContext = createContext();
export const useGuideContext = () => useContext(GuideContext);

export const GettingStartedGuide = ({
  onboarding = {},
  history,
  setAccountOption,
  hasSendingDomains,
  hasApiKeysForSending,
  isAdmin,
}) => {
  const {
    isGuideAtBottom = false,
    active_step,
    send_test_email_completed,
    explore_analytics_completed,
    invite_collaborator_completed,
    view_developer_docs_completed,
  } = onboarding;

  const areAllGuidesCompleted =
    send_test_email_completed &&
    explore_analytics_completed &&
    invite_collaborator_completed &&
    view_developer_docs_completed &&
    hasSendingDomains &&
    hasApiKeysForSending;

  const setOnboardingAccountOption = (obj = {}) => {
    if (isAdmin) {
      setAccountOption('onboarding', obj);
    }
  };

  //TODO: set isGuideAtBottom to true if all the CheckLists are completed.
  const actions =
    isGuideAtBottom || areAllGuidesCompleted
      ? null
      : [
          {
            content: (
              <span>
                {`Move to Bottom`} <ArrowDownward size="20" />{' '}
              </span>
            ),
            color: 'blue',
            onClick: () => setOnboardingAccountOption({ isGuideAtBottom: true }),
          },
        ];
  //stepName could be Features,Sending,Show Me Sparkpost, Let's Code
  const currentSteps = ['Sending', "Let's Code", 'Show Me SparkPost'];
  const defaultStep = 'Sending';
  const [stepName, setStepName] = useState(
    currentSteps.includes(active_step) ? active_step : defaultStep,
  );

  const setAndStoreStepName = active_step => {
    setOnboardingAccountOption({ active_step: active_step });
    setStepName(active_step);
  };
  const handleAction = action => {
    switch (action) {
      case 'Send Test Email':
        setOnboardingAccountOption({ send_test_email_completed: true });
        history.push(`/templates?pendo=${GUIDE_IDS.SEND_TEST_EMAIL}`);
        break;
      case 'Explore Analytics':
        setOnboardingAccountOption({ explore_analytics_completed: true });
        if (window.pendo.showGuideById(GUIDE_IDS.EXPLORE_ANALYTICS)) {
          window.pendo.onGuideAdvanced(1);
        }
        history.push(`/reports/summary`);

        break;
      case 'Invite a Collaborator':
        setOnboardingAccountOption({ invite_collaborator_completed: true });
        history.push('/account/users');
        break;
      case 'View Developer Docs':
        setOnboardingAccountOption({ view_developer_docs_completed: true });
        break;
      case 'Generate API Key':
        history.push('/account/api-keys');
        break;
      case 'Add Sending Domain':
        history.push(`/account/sending-domains`);
        break;
      default:
        break;
    }
  };

  const step = {
    Sending: <SendingStep />,

    'Show Me SparkPost': <ShowMeSparkpostStep />,

    "Let's Code": <LetsCodeStep />,
  };
  const values = {
    stepName: stepName,
    setAndStoreStepName: setAndStoreStepName,
    setOnboardingAccountOption: setOnboardingAccountOption,
    send_test_email_completed: send_test_email_completed,
    explore_analytics_completed: explore_analytics_completed,
    invite_collaborator_completed: invite_collaborator_completed,
    hasSendingDomains: hasSendingDomains,
    hasApiKeysForSending: hasApiKeysForSending,
    view_developer_docs_completed: view_developer_docs_completed,
    handleAction: handleAction,
  };

  return (
    <GuideContext.Provider value={values}>
      <Panel title="Getting Started" actions={actions}>
        {step[stepName]}
      </Panel>
    </GuideContext.Provider>
  );
};
