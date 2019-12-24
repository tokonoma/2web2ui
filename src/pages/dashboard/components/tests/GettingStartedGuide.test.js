import React from 'react';
import { shallow, mount } from 'enzyme';
import { GettingStartedGuide } from '../GettingStartedGuide';
import { GUIDE_IDS } from '../../constants';

describe('GettingStartedGuide', () => {
  window.pendo = {
    showGuideById: jest.fn(() => true),
    onGuideAdvanced: jest.fn(),
  };

  const defaultProps = {
    onboarding: { isGuideAtBottom: false },
    history: {
      push: jest.fn(),
    },
    listApiKeys: jest.fn(),
    setAccountOption: jest.fn(),
    listSendingDomains: jest.fn(),
  };

  const subject = (props, func = shallow) =>
    func(<GettingStartedGuide {...defaultProps} {...props} />);

  it('should render correctly when guide is at bottom or when guide is at top', () => {
    expect(
      subject({ onboarding: { isGuideAtBottom: true } })
        .find('Panel')
        .prop('actions'),
    ).toBe(null);
    expect(
      subject({ onboarding: { isGuideAtBottom: false } })
        .find('Panel')
        .prop('actions'),
    ).not.toBe(null);
  });

  it('should render the corresponding step when breadcrumb is clicked', () => {
    const instance = subject({ onboarding: { active_step: 'Show Me SparkPost' } });
    instance
      .find('BreadCrumbsItem')
      .at(1)
      .simulate('click');
    expect(instance.find('SendingStepList')).toHaveLength(1);
  });

  it('should render the BreadCrumbItem as active corresponding to the Step', () => {
    const instance = subject({ onboarding: { active_step: 'Show Me SparkPost' } });
    expect(instance.find({ active: true })).toHaveTextContent('Show Me SparkPost');
  });

  it('should render three list items when on step "Show Me SparkPost" ', () => {
    const instance = subject({ onboarding: { active_step: 'Show Me SparkPost' } });
    expect(instance.find('CheckListItem')).toHaveLength(3);
  });

  it('should navigate to templates page when Send a Test Email button is clicked', () => {
    const instance = subject({ onboarding: { active_step: 'Show Me SparkPost' } }, mount);
    instance
      .find('GuideListItem')
      .at(0)
      .prop('action')
      .onClick();
    expect(defaultProps.history.push).toHaveBeenCalledWith(
      `/templates?pendo=${GUIDE_IDS.SEND_TEST_EMAIL}`,
    );
  });

  it('should navigate to summary report when Explore Analytics button is clicked', () => {
    const instance = subject({ onboarding: { active_step: 'Show Me SparkPost' } }, mount);

    instance
      .find('GuideListItem')
      .at(1)
      .prop('action')
      .onClick();
    expect(defaultProps.history.push).toHaveBeenCalledWith(`/reports/summary`);
    expect(window.pendo.showGuideById).toHaveBeenCalledWith(GUIDE_IDS.EXPLORE_ANALYTICS);
    expect(window.pendo.onGuideAdvanced).toHaveBeenCalledWith(1);
  });

  it('should navigate to users page when Invite a Collaborator is clicked', () => {
    const instance = subject({ onboarding: { active_step: 'Show Me SparkPost' } }, mount);
    instance
      .find('GuideListItem')
      .at(2)
      .prop('action')
      .onClick();
    expect(defaultProps.history.push).toHaveBeenCalledWith(`/account/users`);
  });

  it('should mark Invite a Collaborator list item as completed when the the corresponding button is clicked', () => {
    const instance = subject({ onboarding: { active_step: 'Show Me SparkPost' } }, mount);
    instance
      .find('GuideListItem')
      .at(2)
      .prop('action')
      .onClick();
    expect(defaultProps.setAccountOption).toHaveBeenCalledWith('onboarding', {
      invite_collaborator_completed: true,
    });
  });
  it("should render two list items when on step Let's Code ", () => {
    const instance = subject({ onboarding: { active_step: "Let's Code" } });
    expect(instance.find('CheckListItem')).toHaveLength(3);
  });

  it('should have an external link to developer docs', () => {
    const instance = subject({ onboarding: { active_step: "Let's Code" } }, mount);

    instance
      .find('GuideListItem')
      .at(2)
      .prop('action')
      .onClick();

    expect(defaultProps.setAccountOption).toHaveBeenCalledWith('onboarding', {
      view_developer_docs_completed: true,
    });

    expect(instance.find('Button[data-id="View Developer Docs"]')).toHaveProp(
      'to',
      'https://developers.sparkpost.com/api',
    );
  });

  it("should route to API key page from Let's Code list", () => {
    const instance = subject(
      {
        onboarding: { active_step: "Let's Code" },
        hasApiKeysForSending: true,
      },
      mount,
    );
    instance
      .find('GuideListItem')
      .at(1)
      .prop('action')
      .onClick();
    expect(defaultProps.history.push).toHaveBeenCalledWith('/account/api-keys');
  });
  it('should navigate to sending domains page when Add Sending Domain is clicked', () => {
    const instance = subject({ onboarding: { active_step: "Let's Code" } }, mount);
    instance
      .find('GuideListItem')
      .at(0)
      .prop('action')
      .onClick();
    expect(defaultProps.history.push).toHaveBeenCalledWith(`/account/sending-domains`);
  });
  it('should mark checklist completed when the user has sending domains setup', () => {
    const instance = subject({
      onboarding: { active_step: "Let's Code", hasSendingDomains: true },
    });
    expect(instance.find({ name: 'Add Sending Domain' }).props('itemCompleted')).toBeTruthy();
  });
});
