import React from 'react';
import { toSentence } from 'src/helpers/array';

const badConditional = (percentage) => percentage > 0.005;
const warnConditional = (percentage) => percentage <= 0.005 && percentage > .001;
const showActionCondidtional = (percentage) => percentage > 0.05;

export const contentGood = {
  content: (
    <>
      Doesn't look like you have any unsubscribe issues. Great job!
    </>
  ),
  type: 'good'
};

// Ordered by priority
export const content = [
  {
    condition: ({ p_total_unsub }) => badConditional(p_total_unsub),
    actionFn: () => ({
      content: (
        <>
          Your unsubscribe rate is high. A consistently high unsubscribe rate will lead to deliverability issues. Consider refreshing your content and cleaning your lists of unengaged recipients.
        </>
      ),
      type: 'bad',
      link: 'https://www.sparkpost.com/docs/signals/list-hygiene/'
    })
  },
  {
    condition: ({ p_365d_unsub, p_90d_unsub, p_14d_unsub, c_365d, c_90d, c_14d }) =>
      badConditional(p_365d_unsub) && showActionCondidtional(c_365d) ||
      badConditional(p_90d_unsub) && showActionCondidtional(c_90d) ||
      badConditional(p_14d_unsub) && showActionCondidtional(c_14d)
    ,
    actionFn: ({ p_365d_unsub, p_90d_unsub, p_14d_unsub, c_365d, c_90d, c_14d }) => {
      const textArray = [];
      if (badConditional(p_14d_unsub) && showActionCondidtional(c_14d)) {
        textArray.push('Recently Engaged');
      }
      if (badConditional(p_90d_unsub) && showActionCondidtional(c_90d)) {
        textArray.push('Semi-Recently Engaged');
      }
      if (badConditional(p_365d_unsub) && showActionCondidtional(c_365d)) {
        textArray.push('Not Recently Engaged');
      }
      const text = toSentence(textArray);

      return {
        content: (
          <>
            Many of your <strong>{text}</strong> recipients are unsubscribing from your emails. If this continues, you risk damaging your reputation.
            Refreshing your content and segmenting your recipients can provide a better customer experience and cut down on unsubscribes
          </>
        ),
        type: 'bad',
        link: 'https://www.sparkpost.com/docs/signals/content-refresh/'
      };
    }
  },
  {
    condition: ({ p_365d_unsub, p_90d_unsub, p_14d_unsub, c_365d, c_90d, c_14d }) =>
      warnConditional(p_365d_unsub) && showActionCondidtional(c_365d) ||
      warnConditional(p_90d_unsub) && showActionCondidtional(c_90d) ||
      warnConditional(p_14d_unsub) && showActionCondidtional(c_14d)
    ,
    actionFn: ({ p_365d_unsub, p_90d_unsub, p_14d_unsub, c_365d, c_90d, c_14d }) => {
      const textArray = [];
      if (warnConditional(p_14d_unsub) && showActionCondidtional(c_14d)) {
        textArray.push('Recently Engaged');
      }
      if (warnConditional(p_90d_unsub) && showActionCondidtional(c_90d)) {
        textArray.push('Semi-Recently Engaged');
      }
      if (warnConditional(p_365d_unsub) && showActionCondidtional(c_365d)) {
        textArray.push('Not Recently Engaged');
      }
      const text = toSentence(textArray);

      return {
        content: (
          <>
            Some of your <strong>{text}</strong> recipients are unsubscribing.
            Refreshing your content and segmenting your recipients can improve your relationships and lead to less unsubscribes.
          </>
        ),
        type: 'warning',
        link: 'https://www.sparkpost.com/docs/signals/content-refresh/'
      };
    }
  },
  {
    condition: ({ p_uneng_unsub, c_uneng }) => badConditional(p_uneng_unsub) && showActionCondidtional(c_uneng),
    actionFn: () => ({
      content: (
        <>
          Many recipients who have never engaged are unsubscribing.
          Proactively remove these recipients to lower your unsubscribe rate – these are subscribers who haven't expressed interest in your email.
        </>
      ),
      type: 'bad',
      link: 'https://www.sparkpost.com/docs/signals/list-hygiene/'
    })
  },
  {
    condition: ({ p_uneng_unsub, c_uneng }) => warnConditional(p_uneng_unsub) && showActionCondidtional(c_uneng),
    actionFn: () => ({
      content: (
        <>
          Some of your recipients who never engaged are unsubscribing. To avoid this problem, remove recipients who never engage.
        </>
      ),
      type: 'warning',
      link: 'https://www.sparkpost.com/docs/signals/list-hygiene/'
    })
  },
  {
    condition: ({ p_new_unsub, c_new }) => p_new_unsub > .0025 && showActionCondidtional(c_new),
    actionFn: () => ({
      content: (
        <>
          New recipients are quickly unsubscribing. Consider improving your list acquisition practices to avoid this problem.
        </>
      ),
      type: 'bad',
      link: 'https://www.sparkpost.com/docs/signals/subscriber-acquisition/'
    })
  },
  {
    condition: ({ p_new_unsub, c_new }) => p_new_unsub <= .0025 && p_new_unsub > .001 && showActionCondidtional(c_new),
    actionFn: () => ({
      content: (
        <>
          Some of your new recipients are unsubscribing immediately. This may indicate that you need to work on your onboarding and sign up flow.
        </>
      ),
      type: 'warning',
      link: 'https://www.sparkpost.com/docs/signals/subscriber-acquisition/'
    })
  }
];
