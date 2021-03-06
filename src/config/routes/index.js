/* eslint-disable max-lines */
import {
  abTesting,
  AccountSettingsPage,
  ImmediateCancelAccountPage,
  alerts,
  apiKeys,
  AuthPage,
  billing,
  DashboardPage,
  DefaultRedirect,
  EnableTfaPage,
  ipPools,
  JoinPage,
  PageNotFound,
  passwordReset,
  PremiumSupportPage,
  recipientLists,
  RecipientValidationPage,
  SingleResultPage,
  UploadedListPage,
  RegisterPage,
  sendingDomains,
  SmtpPage,
  snippets,
  SsoAuthPage,
  SSOPage,
  subaccounts,
  suppressions,
  TfaPage,
  trackingDomains,
  users,
  webhooks,
} from 'src/pages';

import LogoutPage from 'src/pages/logout/LogoutPage';

import onboarding from 'src/pages/onboarding';
import { default as emailVerification } from 'src/components/emailVerification/EmailVerification';
import SecretBillingPlanOrBillingSummaryPage from '../SecretBillingPlanOrBillingSummaryPage';
import DataPrivacyPage from 'src/pages/dataPrivacy/DataPrivacyPage';

import { all, hasGrants, not } from 'src/helpers/conditions';
import {
  isAws,
  isCustomBilling,
  isEnterprise,
  isSelfServeBilling,
} from 'src/helpers/conditions/account';
import { isAzure, isHeroku, isSubaccountUser } from 'src/helpers/conditions/user';
import { configEquals, configFlag } from 'src/helpers/conditions/config';
import App from 'src/components/layout/App';
import LargeForm from 'src/components/layout/LargeForm';

import {
  AUTH_ROUTE,
  DEFAULT_REDIRECT_ROUTE,
  ENABLE_TFA_AUTH_ROUTE,
  SIGN_UP_ROUTE,
  SSO_AUTH_ROUTE,
  TFA_ROUTE,
} from 'src/constants';
//route modules
import { emailRedirects, emailVerificationRedirect } from './emailRoutes';
import templateRoutes from './templates';
import inboxPlacementRoutes from './inboxPlacement';
import blacklistRoutes from './blacklist';
import signalsRoutes from './signals';

// See @sparkpost/access for role to grant mappings

const routes = [
  {
    path: '/',
    public: true,
    redirect: AUTH_ROUTE,
  },
  {
    path: AUTH_ROUTE,
    public: true,
    component: AuthPage,
    title: 'Log In',
  },
  {
    path: TFA_ROUTE,
    public: true,
    component: TfaPage,
    title: 'Two-factor Authentication',
  },
  {
    path: SSO_AUTH_ROUTE,
    public: true,
    component: SsoAuthPage,
    title: 'Single Sign-On',
  },
  {
    path: '/sso',
    public: true,
    component: SSOPage,
    title: 'Single Sign-On',
  },
  {
    path: ENABLE_TFA_AUTH_ROUTE,
    public: true,
    component: EnableTfaPage,
    layout: LargeForm,
    title: 'Enable TFA',
  },
  {
    path: '/register',
    public: true,
    forceLogout: true,
    component: RegisterPage,
    title: 'Finish Your Registration',
  },
  {
    path: '/sign-up',
    public: true,
    redirect: SIGN_UP_ROUTE,
  },
  {
    path: SIGN_UP_ROUTE,
    public: true,
    forceLogout: true,
    component: JoinPage,
    condition: configFlag('featureFlags.has_signup'),
    title: 'Sign Up',
  },
  {
    path: '/forgot-password',
    public: true,
    forceLogout: true,
    component: passwordReset.ForgotPasswordPage,
    title: 'Reset Password',
  },
  {
    path: '/reset-password/:token',
    public: true,
    forceLogout: true,
    component: passwordReset.ResetPasswordPage,
    title: 'Choose a New Password',
  },

  /**
   * This "DefaultRedirect" route is where we send _everyone_ once they first
   * log in, through Auth or Register or SSO or anything else. It will display
   * a loading icon until the access control state is loaded, then make a decision
   * on where to send them based on config, role, etc.
   *
   * TODO: Once the Dashboard is universally accessible, this can probably go away
   */
  {
    path: DEFAULT_REDIRECT_ROUTE,
    component: DefaultRedirect,
    layout: App,
    condition: () => true, // this route MUST be accessible to all logged-in app users
    title: 'Loading...',
  },

  /**
   * Handles route redirects for cutover to GA from old email template links
   * TODO: Should remove at a later date
   */
  ...emailRedirects,

  {
    path: '/dashboard',
    component: DashboardPage,
    layout: App,
    title: 'Dashboard',
    condition: all(
      not(isSubaccountUser),
      configEquals('splashPage', '/dashboard'), // want to hide if not a splash page https://jira.int.messagesystems.com/browse/FAD-6046
    ),
    // TODO: implement some kind of blockedRoutes check that runs on every route so we can
    // hide routes based on config, account/user settings, etc. without having to mess
    // around with grants in the web UI keys
    supportDocSearch: 'started',
  },
  {
    path: '/account/security',
    redirect: '/account/profile',
    category: 'Account',
  },
  {
    path: '/account/email-verification/:token',
    component: emailVerification,
    title: 'Verify Your Email',
    supportDocSearch: 'verification',
    category: 'Account',
  },
  {
    path: '/account/subaccounts',
    component: subaccounts.ListPage,
    condition: hasGrants('subaccount/manage', 'api_keys/manage', 'sending_domains/manage'),
    layout: App,
    title: 'Subaccounts',
    supportDocSearch: 'subaccout',
    category: 'Account',
  },
  {
    path: '/account/subaccounts/create',
    component: subaccounts.CreatePage,
    condition: hasGrants('subaccount/manage', 'api_keys/manage', 'sending_domains/manage'),
    layout: App,
    title: 'New Subaccount',
    supportDocSearch: 'subaccout',
    category: 'Account',
  },
  {
    path: '/account/subaccounts/:id',
    component: subaccounts.DetailsPage,
    condition: hasGrants('subaccount/manage', 'api_keys/manage', 'sending_domains/manage'),
    layout: App,
    title: 'Subaccount Details',
    exact: false,
    supportDocSearch: 'subaccout',
    category: 'Account',
  },
  {
    path: '/account/users',
    component: users.ListPage,
    condition: hasGrants('users/manage'),
    layout: App,
    title: 'Users',
    supportDocSearch: 'user',
    category: 'Account',
  },
  {
    path: '/account/users/create',
    component: users.CreatePage,
    condition: hasGrants('users/manage'),
    layout: App,
    title: 'Invite User',
    supportDocSearch: 'user',
    category: 'Account',
  },
  {
    path: '/account/users/edit/:id',
    component: users.EditPage,
    condition: hasGrants('users/manage'),
    layout: App,
    title: 'Edit User',
    supportDocSearch: 'user',
    category: 'Account',
  },
  {
    path: '/snippets',
    component: snippets.ListPage,
    condition: hasGrants('templates/view'),
    layout: App,
    title: 'Snippets',
    supportDocSearch: 'snippet',
    category: 'Content',
    subcategory: 'Snippets',
  },
  {
    path: '/snippets/create',
    component: snippets.CreatePage,
    condition: hasGrants('templates/modify'),
    layout: App,
    title: 'New Snippet',
    supportDocSearch: 'snippet',
    category: 'Content',
    subcategory: 'Snippets',
  },
  {
    path: '/snippets/edit/:id',
    component: snippets.EditPage,
    condition: hasGrants('templates/view'),
    layout: App,
    title: 'Edit Snippet',
    supportDocSearch: 'snippet',
    category: 'Content',
    subcategory: 'Snippets',
  },

  {
    path: '/lists/recipient-lists',
    component: recipientLists.ListPage,
    condition: hasGrants('recipient_lists/manage'),
    layout: App,
    title: 'Recipient Lists',
    supportDocSearch: 'recipient list',
    category: 'Recipients',
    subcategory: 'Recipient Lists',
  },
  {
    path: '/lists/recipient-lists/create',
    component: recipientLists.CreatePage,
    condition: hasGrants('recipient_lists/manage'),
    layout: App,
    title: 'New Recipient List',
    supportDocSearch: 'recipient list',
    category: 'Recipients',
    subcategory: 'Recipient Lists',
  },
  {
    path: '/lists/recipient-lists/edit/:id',
    component: recipientLists.EditPage,
    condition: hasGrants('recipient_lists/manage'),
    layout: App,
    title: 'Edit Recipient List',
    supportDocSearch: 'recipient list',
    category: 'Recipients',
    subcategory: 'Recipient Lists',
  },
  {
    path: '/lists/suppressions',
    component: suppressions.ListPage,
    condition: hasGrants('suppression_lists/manage'),
    layout: App,
    title: 'Suppressions',
    supportDocSearch: 'suppression list',
    category: 'Recipients',
    subcategory: 'Suppressions',
  },
  {
    path: '/lists/suppressions/create',
    component: suppressions.CreatePage,
    condition: hasGrants('suppression_lists/manage'),
    layout: App,
    title: 'New Suppression',
    supportDocSearch: 'suppression list',
    category: 'Recipients',
    subcategory: 'Suppressions',
  },
  {
    path: '/webhooks',
    component: webhooks.ListPage,
    condition: hasGrants('webhooks/view'),
    layout: App,
    title: 'Webhooks',
    supportDocSearch: 'webhook',
    category: 'Configuration',
    subcategory: 'Webhooks',
  },
  {
    path: '/webhooks/create',
    component: webhooks.CreatePage,
    condition: hasGrants('webhooks/modify'),
    layout: App,
    title: 'New Webhook',
    supportDocSearch: 'webhook',
    category: 'Configuration',
    subcategory: 'Webhooks',
  },
  {
    path: '/webhooks/details/:id',
    component: webhooks.DetailsPage,
    condition: hasGrants('webhooks/modify'),
    layout: App,
    title: 'Webhook Details',
    exact: false,
    supportDocSearch: 'webhook',
    category: 'Configuration',
    subcategory: 'Webhooks',
  },
  {
    path: '/account/api-keys',
    component: apiKeys.ListPage,
    condition: hasGrants('api_keys/manage'),
    layout: App,
    title: 'API Keys',
    supportDocSearch: 'api key',
    category: 'Configuration',
    subcategory: 'API Keys',
  },
  {
    path: '/account/api-keys/create',
    component: apiKeys.CreatePage,
    condition: hasGrants('api_keys/manage'),
    layout: App,
    title: 'New API Key',
    supportDocSearch: 'api key',
    category: 'Configuration',
    subcategory: 'API Keys',
  },
  {
    path: '/account/api-keys/edit/:id',
    component: apiKeys.EditPage,
    condition: hasGrants('api_keys/manage'),
    layout: App,
    title: 'Edit API Key',
    supportDocSearch: 'api key',
    category: 'Configuration',
    subcategory: 'API Keys',
  },
  {
    path: '/account/api-keys/view/:id',
    component: apiKeys.DetailsPage,
    condition: hasGrants('api_keys/manage'),
    layout: App,
    title: 'View API Key',
    supportDocSearch: 'api key',
    category: 'Configuration',
    subcategory: 'API Keys',
  },
  {
    path: '/account/tracking-domains',
    component: trackingDomains.ListPage,
    condition: hasGrants('tracking_domains/manage'),
    layout: App,
    title: 'Tracking Domains',
    supportDocSearch: 'tracking domain',
    category: 'Configuration',
    subcategory: 'Tracking Domains',
  },
  {
    path: '/account/tracking-domains/create',
    component: trackingDomains.CreatePage,
    condition: hasGrants('tracking_domains/manage'),
    layout: App,
    title: 'New Tracking Domain',
    supportDocSearch: 'tracking domain',
    category: 'Configuration',
    subcategory: 'Tracking Domains',
  },
  {
    path: '/account/settings',
    component: AccountSettingsPage,
    condition: hasGrants('users/manage'),
    layout: App,
    title: 'Account settings',
    supportDocSearch: 'account settings',
    category: 'Account',
  },
  {
    path: '/account/data-privacy',
    redirect: '/account/data-privacy/single-recipient',
    category: 'Account',
  },
  {
    path: '/account/data-privacy/:category',
    component: DataPrivacyPage,
    condition: hasGrants('users/manage'),
    layout: App,
    title: 'Data and Privacy',
    category: 'Account',
  },
  {
    path: '/account/cancel',
    component: ImmediateCancelAccountPage,
    condition: all(hasGrants('account/manage'), not(isEnterprise), not(isHeroku), not(isAzure)),
    layout: App,
    title: 'Account | Cancellation In Progress',
    category: 'Account',
  },
  {
    path: '/account/profile',
    component: emailVerificationRedirect,
    condition: hasGrants('users/self-manage'),
    layout: App,
    title: 'My Profile',
    supportDocSearch: 'account profile',
    category: 'Account',
  },
  {
    path: '/account/sending-domains',
    component: sendingDomains.ListPage,
    condition: hasGrants('sending_domains/manage'),
    layout: App,
    title: 'Sending Domains',
    supportDocSearch: 'sending domain',
    category: 'Configuration',
    subcategory: 'Sending Domains',
  },
  {
    path: '/account/sending-domains/create',
    component: sendingDomains.CreatePage,
    condition: hasGrants('sending_domains/manage'),
    layout: App,
    title: 'New Sending Domain',
    supportDocSearch: 'sending domain',
    category: 'Configuration',
    subcategory: 'Sending Domains',
  },
  {
    path: '/account/sending-domains/edit/:id',
    component: sendingDomains.EditPage,
    condition: hasGrants('sending_domains/manage'),
    layout: App,
    title: 'Edit Sending Domain',
    supportDocSearch: 'sending domain',
    category: 'Configuration',
    subcategory: 'Sending Domains',
  },
  {
    path: '/account/smtp',
    component: SmtpPage,
    condition: hasGrants('api_keys/manage'),
    layout: App,
    title: 'SMTP Settings',
    supportDocSearch: 'smtp',
    category: 'Configuration',
    subcategory: 'SMTP Settings',
  },
  {
    path: '/account/billing',
    component: SecretBillingPlanOrBillingSummaryPage,
    condition: all(hasGrants('account/manage'), not(isEnterprise), not(isHeroku), not(isAzure)),
    layout: App,
    title: 'Billing',
    supportDocSearch: 'billing',
    category: 'Account',
  },
  {
    path: '/account/billing/enable-automatic',
    component: billing.EnableAutomaticBillingPage,
    condition: all(hasGrants('account/manage'), not(isSelfServeBilling)),
    layout: App,
    title: 'Billing | Enable Automatic Billing',
    supportDocSearch: 'upgrade account',
    category: 'Account',
  },
  {
    path: '/account/billing/plan',
    component: billing.ChangePlanPage,
    condition: all(
      hasGrants('account/manage'),
      not(isEnterprise),
      not(isHeroku),
      not(isAzure),
      not(isCustomBilling),
      not(isAws),
    ),
    layout: App,
    title: 'Billing | Change My Plan',
    supportDocSearch: 'upgrade account',
    category: 'Account',
  },
  {
    path: '/account/ip-pools',
    component: ipPools.ListPage,
    condition: hasGrants('ip_pools/manage'),
    layout: App,
    title: 'IP Pools',
    supportDocSearch: 'ip pool',
    category: 'Configuration',
    subcategory: 'IP Pools',
  },
  {
    path: '/account/ip-pools/create',
    component: ipPools.CreatePage,
    condition: hasGrants('ip_pools/manage'),
    layout: App,
    title: 'New IP Pool',
    supportDocSearch: 'ip pool',
    category: 'Configuration',
    subcategory: 'IP Pools',
  },
  {
    path: '/account/ip-pools/edit/:poolId',
    component: ipPools.EditPage,
    condition: hasGrants('ip_pools/manage'),
    layout: App,
    title: 'Edit IP Pool',
    supportDocSearch: 'ip pool',
    category: 'Configuration',
    subcategory: 'IP Pools',
  },
  {
    path: '/account/ip-pools/edit/:poolId/:ip',
    component: ipPools.EditIpPage,
    condition: hasGrants('ip_pools/manage'),
    layout: App,
    title: 'Edit IP',
    supportDocSearch: 'ip pool',
    category: 'Configuration',
    subcategory: 'IP Pools',
  },
  {
    path: '/ab-testing',
    component: abTesting.ListPage,
    condition: hasGrants('ab-testing/manage'),
    layout: App,
    title: 'A/B Testing',
    supportDocsSearch: 'A/B test',
    category: 'Content',
    subcategory: 'A/B Testing',
  },
  {
    path: '/ab-testing/create',
    component: abTesting.CreatePage,
    condition: hasGrants('ab-testing/manage'),
    layout: App,
    title: 'Create A/B Test',
    supportDocsSearch: 'A/B test',
    category: 'Content',
    subcategory: 'A/B Testing',
  },
  {
    path: '/ab-testing/:id/:version',
    component: abTesting.DetailsPage,
    condition: hasGrants('ab-testing/manage'),
    layout: App,
    title: 'A/B Testing',
    supportDocsSearch: 'A/B test',
    category: 'Content',
    subcategory: 'A/B Testing',
  },
  {
    path: '/alerts',
    component: alerts.ListPage,
    condition: hasGrants('alerts/manage'),
    layout: App,
    title: 'Alerts',
    supportDocsSearch: 'Alerts',
    category: 'Alerts',
  },
  {
    path: '/alerts/details/:id',
    component: alerts.DetailsPage,
    condition: hasGrants('alerts/manage'),
    layout: App,
    title: 'Alert Details | Alerts',
    supportDocsSearch: 'Alerts',
    category: 'Alerts',
  },
  {
    path: '/alerts/create/:id?',
    component: alerts.CreatePage,
    condition: hasGrants('alerts/manage'),
    layout: App,
    title: 'Create Alert | Alerts',
    supportDocsSearch: 'Alerts',
    category: 'Alerts',
  },
  {
    path: '/alerts/edit/:id',
    component: alerts.EditPage,
    condition: hasGrants('alerts/manage'),
    layout: App,
    title: 'Edit Alert | Alerts',
    supportDocsSearch: 'Alerts',
    category: 'Alerts',
  },
  {
    path: '/onboarding/plan',
    component: onboarding.ChoosePlan,
    condition: configFlag('featureFlags.has_signup'),
    title: 'Choose Your Plan | Onboarding',
    supportDocSearch: 'upgrade account',
  },
  {
    path: '/onboarding/recipient-validation',
    component: onboarding.RVBundlePage,
    condition: configFlag('featureFlags.has_signup'),
    title: 'Recipient Validation | Onboarding',
    layout: LargeForm,
  },
  {
    path: '/recipient-validation',
    redirect: '/recipient-validation/list',
    category: 'Recipients',
    subcategory: 'Recipient Validation',
  },
  {
    path: '/recipient-validation/single/:email',
    component: SingleResultPage,
    condition: hasGrants('recipient-validation/manage'),
    layout: App,
    title: 'Results | Recipient Validation',
    supportDocsSearch: 'Recipient Validation',
    category: 'Recipients',
    subcategory: 'Recipient Validation',
  },
  {
    path: '/recipient-validation/list/:listId',
    component: UploadedListPage,
    condition: hasGrants('recipient-validation/preview'),
    layout: App,
    title: 'Validation Status | List | Recipient Validation',
    supportDocsSearch: 'Recipient Validation',
    category: 'Recipients',
    subcategory: 'Recipient Validation',
  },
  {
    path: '/recipient-validation/:category',
    component: RecipientValidationPage,
    condition: hasGrants('recipient-validation/preview'), // must manual keep in sync with nav item
    layout: App,
    title: 'Recipient Validation',
    supportDocsSearch: 'Recipient Validation',
    category: 'Recipients',
    subcategory: 'Recipient Validation',
  },
  {
    path: '/support/aws-premium',
    component: PremiumSupportPage,
    condition: isAws,
    title: 'Support | Request Premium Support',
    layout: App,
    supportDocSearch: 'upgrade plan',
    category: 'Account',
  },
  {
    path: '/error-boundary',
    public: true,
    component: () => {
      throw new Error('Oops');
    },
  },
  {
    path: '/private-error-boundary',
    layout: App,
    component: () => {
      throw new Error('Oops');
    },
  },
  {
    path: '/logout',
    component: LogoutPage,
    title: 'Logging out...',
  },
  ...signalsRoutes,
  ...templateRoutes,
  ...inboxPlacementRoutes,
  ...blacklistRoutes,
];

// ensure 404 is always last in routes
routes.push({
  path: '*',
  component: PageNotFound,
  layout: App,
  title: 'Page Not Found',
});

export default routes;
