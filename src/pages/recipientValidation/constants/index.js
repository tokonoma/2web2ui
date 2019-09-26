export const ROLE_TOOLTIP = 'Role email addresses represent a group or activity (sales, abuse) \
  and not an individual. They tend to have a lower engagement rate and a higher unsubscribe rate.';

export const DISPOSABLE_TOOLTIP = 'Disposable email providers are services that create email \
  addresses that are discarded after one use or a short time period. These addresses should be avoided.';

export const FREE_TOOLTIP = 'Free email providers such as Gmail allow anyone to sign up \
  for an email address. Businesses may consider blocking these to eliminate low-quality leads.';

export const DID_YOU_MEAN_TOOLTIP = '"Did you mean" indicates a likely typo in the domain for \
the given email address. This helps you catch human typos and spam traps before you add them to your list.';

export const RESULT_DESCRIPTIONS = {
  valid: 'A valid result means that everything checks out for email address and \
    we have no data suggesting that is invalid for any reason.',
  undeliverable: 'An undeliverable result means that our data analysis confidently points \
    to the fact that the email address does not exist or will hard bounce for some other reason.',
  risky: 'A risky result means that our data analysis indicated that the email address will likely \
    bounce or that the address has other issues.'
};
