import React, { Fragment } from 'react';
const badConditional = (percentage) => percentage > 0.005;
const warnConditional = (percentage) => percentage <= 0.005 && percentage > .001;

// Ordered by priority
const content = [
  {
    condition: ({ p_total_fbl }) => badConditional(p_total_fbl),
    actionFn: () => ({
      content: (
        <Fragment>
        Your complaint rate is unusually high. A consistently high complaint rate leads to deliverability issues. Work on improving your list hygiene and consider refreshing your content.
        </Fragment>
      ),
      type: 'bad',
      link: 'https://www.sparkpost.com/docs/signals/'
    })
  },
  {
    condition: ({ p_365d_fbl, p_90d_fbl, p_14d_fbl }) => badConditional(p_365d_fbl) || badConditional(p_90d_fbl) || badConditional(p_14d_fbl),
    actionFn: ({ p_365d_fbl, p_90d_fbl, p_14d_fbl }) => {
      const textArray = [];
      if (badConditional(p_14d_fbl)) {
        textArray.push('Recently Engaged');
      }
      if (badConditional(p_90d_fbl)) {
        textArray.push('Semi-Recently Engaged');
      }
      if (badConditional(p_365d_fbl)) {
        textArray.push('Not Recently Engaged');
      }
      const text = textArray.slice(0, -2).join(', ') +
        (textArray.slice(0, -2).length ? ', ' : '') +
        textArray.slice(-2).join(' and ');
      return {
        content: (
          <Fragment>
            Many of your <strong>{text}</strong> recipients are marking your emails as spam. If this continues, you risk hurting your performance.
            Refreshing your content and segmenting your recipients can provide a better customer experience and lead to less spam complaints.
          </Fragment>
        ),
        type: 'bad',
        link: 'https://www.sparkpost.com/docs/signals/content-refresh/'
      };
    }
  },
  {
    condition: ({ p_365d_fbl, p_90d_fbl, p_14d_fbl }) => warnConditional(p_365d_fbl) || warnConditional(p_90d_fbl) || warnConditional(p_14d_fbl),
    actionFn: ({ p_365d_fbl, p_90d_fbl, p_14d_fbl }) => {
      const textArray = [];
      if (warnConditional(p_14d_fbl)) {
        textArray.push('Recently Engaged');
      }
      if (warnConditional(p_90d_fbl)) {
        textArray.push('Semi-Recently Engaged');
      }
      if (warnConditional(p_365d_fbl)) {
        textArray.push('Not Recently Engaged');
      }
      const text = textArray.slice(0, -2).join(', ') +
        (textArray.slice(0, -2).length ? ', ' : '') +
        textArray.slice(-2).join(' and ');
      return {
        content: (
          <Fragment>
            Some of your <strong>{text}</strong> recipients are marking your emails as spam.
            Refreshing your content and segmenting your recipients can improve your relationships and lead to less spam complaints.
          </Fragment>
        ),
        type: 'warning',
        link: 'https://www.sparkpost.com/docs/signals/content-refresh/'
      };
    }
  },
  {
    condition: ({ p_uneng_fbl }) => badConditional(p_uneng_fbl),
    actionFn: () => ({
      content: (
        <Fragment>
          Many recipients who have never engaged are reporting your emails as spam. Remove these recipients to lower your complaint rate. A high complaint rate will lead to deliverability issues.
        </Fragment>
      ),
      type: 'bad',
      link: 'https://www.sparkpost.com/docs/signals/list-hygiene/'
    })
  },
  {
    condition: ({ p_uneng_fbl }) => warnConditional(p_uneng_fbl),
    actionFn: () => ({
      content: (
        <Fragment>
          Some recipients who have never engaged are reporting your emails as spam. Consider removing these recipients to lower your complaint rate.
        </Fragment>
      ),
      type: 'warning',
      link: 'https://www.sparkpost.com/docs/signals/list-hygiene/'
    })
  },
  {
    condition: ({ p_new_fbl }) => p_new_fbl > .0025,
    actionFn: () => ({
      content: (
        <Fragment>
          New recipients are marking your emails as spam. Consider improving your list acquisition practices to lower your complaint rate and provider a better experience.
        </Fragment>
      ),
      type: 'bad',
      link: 'https://www.sparkpost.com/docs/signals/subscriber-acquisition/'
    })
  },
  {
    condition: ({ p_new_fbl }) => p_new_fbl <= .0025 && p_new_fbl > .001,
    actionFn: () => ({
      content: (
        <Fragment>
          Some of your new recipients marked your emails as spam. This is a sign you may need to set better expectations when subscribers first sign up.
        </Fragment>
      ),
      type: 'warning',
      link: 'https://www.sparkpost.com/docs/signals/subscriber-acquisition/'
    })
  }
];

export default content;
