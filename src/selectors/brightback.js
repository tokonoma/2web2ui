import config from 'src/config';
import { getLocalTimezone } from 'src/helpers/date';
import { getDomainFromEmail } from 'src/helpers/email';

export const selectBrightbackData = (state, { urls = {}}) => {
  const { customer_id, created, company_name, subscription } = state.account;
  const { recurring_charge, period } = subscription;
  const { email } = state.currentUser;
  const { brightback: brightbackConfig } = config;
  const { save_return_url, cancel_confirmation_url, billing_url } = urls;

  return {
    app_id: brightbackConfig.app_id,
    timestamp: new Date().toISOString(),
    context: {
      locale: navigator.language,
      timezone: getLocalTimezone(),
      user_agent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer
    },
    save_return_url: `${window.location.origin}${save_return_url}`,
    cancel_confirmation_url: `${window.location.origin}${cancel_confirmation_url}?immediatePlanChange=${brightbackConfig.freePlan}`,
    billing_url: `${window.location.origin}${billing_url}`,
    account: {
      created_at: new Date(created).getTime(),
      internal_id: customer_id,
      company_name,
      value: period === 'month' ? recurring_charge : undefined,
      company_domain: getDomainFromEmail(email)
    },
    email
  };
};
