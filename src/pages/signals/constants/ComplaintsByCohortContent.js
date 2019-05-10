import React from 'react';
import { toSentence } from 'src/helpers/array';

const badConditional = (percentage) => percentage > 0.005;
const warnConditional = (percentage) => percentage <= 0.005 && percentage > .001;
const showActionCondidtional = (percentage) => percentage > 0.05;

// Ordered by priority
const content = [
  {
    condition: ({ p_total_fbl }) => badConditional(p_total_fbl),
    actionFn: () => ({
      content: (
        <>
        Your complaint rate is unusually high. A consistently high complaint rate leads to deliverability issues. Work on improving your list hygiene and consider refreshing your content.
        </>
      ),
      type: 'bad',
      link: 'https://www.sparkpost.com/docs/signals/'
    })
  },
  {
    condition: ({ p_365d_fbl, p_90d_fbl, p_14d_fbl, c_365d, c_90d, c_14d }) => badConditional(p_365d_fbl) && showActionCondidtional(c_365d) ||
      badConditional(p_90d_fbl) && showActionCondidtional(c_90d) ||
      badConditional(p_14d_fbl) && showActionCondidtional(c_14d)
    ,
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
      const text = toSentence(textArray);

      return {
        content: (
          <>
            Many of your <strong>{text}</strong> recipients are marking your emails as spam. If this continues, you risk hurting your performance.
            Refreshing your content and segmenting your recipients can provide a better customer experience and lead to less spam complaints.
          </>
        ),
        type: 'bad',
        link: 'https://www.sparkpost.com/docs/signals/content-refresh/'
      };
    }
  },
  {
    condition: ({ p_365d_fbl, p_90d_fbl, p_14d_fbl, c_365d, c_90d, c_14d }) => warnConditional(p_365d_fbl) && showActionCondidtional(c_365d) ||
      warnConditional(p_90d_fbl) && showActionCondidtional(c_90d) ||
      warnConditional(p_14d_fbl) && showActionCondidtional(c_14d)
    ,
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
      const text = toSentence(textArray);

      return {
        content: (
          <>
            Some of your <strong>{text}</strong> recipients are marking your emails as spam.
            Refreshing your content and segmenting your recipients can improve your relationships and lead to less spam complaints.
          </>
        ),
        type: 'warning',
        link: 'https://www.sparkpost.com/docs/signals/content-refresh/'
      };
    }
  },
  {
    condition: ({ p_uneng_fbl, c_uneng }) => badConditional(p_uneng_fbl) && showActionCondidtional(c_uneng),
    actionFn: () => ({
      content: (
        <>
          Many recipients who have never engaged are reporting your emails as spam. Remove these recipients to lower your complaint rate and have a more successful email program.
        </>
      ),
      type: 'bad',
      link: 'https://www.sparkpost.com/docs/signals/list-hygiene/'
    })
  },
  {
    condition: ({ p_uneng_fbl, c_uneng }) => warnConditional(p_uneng_fbl) && showActionCondidtional(c_uneng),
    actionFn: () => ({
      content: (
        <>
          Some recipients who have never engaged are reporting your emails as spam. Consider removing these recipients to lower your complaint rate.
        </>
      ),
      type: 'warning',
      link: 'https://www.sparkpost.com/docs/signals/list-hygiene/'
    })
  },
  {
    condition: ({ p_new_fbl, c_new }) => p_new_fbl > .0025 && showActionCondidtional(c_new),
    actionFn: () => ({
      content: (
        <>
          New recipients are marking your emails as spam. Consider improving your list acquisition practices to lower your complaint rate and provider a better experience.
        </>
      ),
      type: 'bad',
      link: 'https://www.sparkpost.com/docs/signals/subscriber-acquisition/'
    })
  },
  {
    condition: ({ p_new_fbl, c_new }) => p_new_fbl <= .0025 && p_new_fbl > .001 && showActionCondidtional(c_new),
    actionFn: () => ({
      content: (
        <>
          Some of your new recipients marked your emails as spam. This is a sign you may need to set better expectations when subscribers first sign up.
        </>
      ),
      type: 'warning',
      link: 'https://www.sparkpost.com/docs/signals/subscriber-acquisition/'
    })
  }
];

export default content;
