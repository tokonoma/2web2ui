import React, { useState, useRef, useEffect } from 'react';
import { Panel } from '@sparkpost/matchbox';
import { ArrowDownward } from '@sparkpost/matchbox-icons';
import styles from './GettingStartedGuide.module.scss';
import { BreadCrumbs, BreadCrumbsItem } from 'src/components';
import { GuideListItem, GuideListItemTitle, GuideListItemDescription } from './GuideListItem';
import { GUIDE_IDS, LETS_CODE_LIST, SHOW_ME_SPARKPOST_LIST, BREADCRUMB_ITEMS } from '../constants';
import { UnstyledLink } from '@sparkpost/matchbox';
import SendingStepList from './SendingStepList';
import FeatureStepList from './FeaturesStepList';

export const GettingStartedGuide = ({ onboarding = {}, history, setAccountOption }) => {
  const {
    isGuideAtBottom = false,
    active_step,
    send_test_email_completed,
    explore_analytics_completed,
    invite_collaborator_completed,
    add_sending_domain_completed,
  } = onboarding;

  const setOnboardingAccountOption = (obj = {}) => {
    setAccountOption('onboarding', obj);
  };

  const actions = isGuideAtBottom
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
  const [stepName, setStepName] = useState(active_step || 'Features');
  const guideHeadingRef = useRef(null);
  useEffect(() => {
    if (guideHeadingRef.current) {
      guideHeadingRef.current.focus();
    }
  }, [stepName]);
  const renderBreadCrumbs = () => (
    <BreadCrumbs>
      {BREADCRUMB_ITEMS[stepName].map(item => (
        <BreadCrumbsItem
          key={item}
          onClick={() => setAndStoreStepName(item)}
          active={stepName === item}
        >
          {item}
        </BreadCrumbsItem>
      ))}
    </BreadCrumbs>
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
      default:
        break;
    }
  };

  const getDescription = checklist_name => {
    if (checklist_name === 'Invite a Collaborator')
      return (
        <>
          {
            'Need help integrating? Pass the ball on to someone else to finish setting up this account.'
          }
          <br />
          {'Or you can '}
          <UnstyledLink
            onClick={() => {
              setAndStoreStepName("Let's Code");
              setOnboardingAccountOption({ invite_collaborator_completed: true });
            }}
          >
            setup email sending now
          </UnstyledLink>
        </>
      );

    return null;
  };

  const renderStep = () => {
    switch (stepName) {
      case 'Features':
        return (
          <Panel.Section>
            {renderBreadCrumbs()}
            <FeatureStepList setAndStoreStepName={setAndStoreStepName} />
          </Panel.Section>
        );

      case 'Sending':
        return (
          <Panel.Section>
            {renderBreadCrumbs()}
            <p
              className={styles.SendingStepHeading}
              role="heading"
              aria-level="4"
              ref={guideHeadingRef}
              tabIndex={-1}
            >
              Where Would You Like to Begin?
            </p>
            <SendingStepList setAndStoreStepName={setAndStoreStepName} />
          </Panel.Section>
        );

      case 'Show Me SparkPost':
        return (
          <>
            <Panel.Section>
              {renderBreadCrumbs()}
              <CheckListItem
                {...SHOW_ME_SPARKPOST_LIST['Send Test Email']}
                itemCompleted={send_test_email_completed}
              />
            </Panel.Section>
            <Panel.Section>
              <CheckListItem
                {...SHOW_ME_SPARKPOST_LIST['Explore Analytics']}
                itemCompleted={explore_analytics_completed}
              />
            </Panel.Section>
            <Panel.Section>
              <CheckListItem
                {...SHOW_ME_SPARKPOST_LIST['Invite a Collaborator']}
                itemCompleted={invite_collaborator_completed}
              />
            </Panel.Section>
          </>
        );
      case "Let's Code":
        return (
          <>
            <Panel.Section>
              {renderBreadCrumbs()}
              <CheckListItem
                {...LETS_CODE_LIST['Add Sending Domain']}
                itemCompleted={add_sending_domain_completed}
              />
            </Panel.Section>
            <Panel.Section>
              <CheckListItem {...LETS_CODE_LIST['Generate API Key']} />
            </Panel.Section>
          </>
        );
      default:
        return null;
    }
  };
  const CheckListItem = ({ name, title, description, itemCompleted }) => (
    <GuideListItem
      action={{
        name: name,
        onClick: () => handleAction(name),
      }}
      itemCompleted={itemCompleted}
    >
      <GuideListItemTitle>{title}</GuideListItemTitle>
      <GuideListItemDescription>{getDescription(name) || description}</GuideListItemDescription>
    </GuideListItem>
  );
  return (
    <Panel title="Getting Started" actions={actions}>
      {renderStep()}
    </Panel>
  );
};
