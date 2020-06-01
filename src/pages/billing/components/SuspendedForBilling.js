import React from 'react';
import { Banner, Stack } from 'src/components/matchbox';
import UpdatePaymentForm from '../forms/UpdatePaymentForm';
import { SupportTicketLink } from 'src/components/links';

export default function SuspendedForBilling({ account }) {
  const { billing = {} } = account;
  const email = billing.email ? ` (${billing.email})` : '';

  return (
    <>
      <Banner
        status="danger"
        title="Your account has been suspended due to a billing problem"
        marginBottom="500"
      >
        <Stack>
          <p>
            We sent an email notification to your current billing contact email address {email}. To
            reactivate your account and pay your outstanding balance due, please update your payment
            information below.
          </p>
          <p>
            If this is incorrect, please{' '}
            {
              <SupportTicketLink issueId="general_billing">
                submit a support ticket
              </SupportTicketLink>
            }{' '}
            and let us know why.
          </p>
        </Stack>
      </Banner>
      <UpdatePaymentForm />
    </>
  );
}
