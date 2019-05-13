import React from 'react';

const showActionCondidtional = (percentage) => percentage > 0.05;

export const contentGood = {
  content: (
  <>
    You have healthy engagement rates! Keep up the great work!
  </>
  ),
  type: 'good'
};

//Separated because it needs a custom link
export const contentTotalEngagement = {
  condition: ({ p_total_eng }) => p_total_eng < 0.05,
  content: (
  <>
    An overall low engagement rate may indicate you emails are being sent to the spam folder. Drill into your Health Score to find the issue.
  </>
  ),
  type: 'bad',
  link: (facet, facetId) => `/signals/health-score/${facet}/${facetId}`
};

// Ordered by priority
export const content = [
  {
    condition: ({ p_14d_eng, c_14d }) => p_14d_eng < 0.05 && showActionCondidtional(c_14d),
    content: (
      <>
        Many subscribers who previously engaged are no longer engaging. Examine your segmentation and targeting to see how you can send more relevant content to your subscribers.
      </>
    ),
    type: 'bad',
    link: 'https://www.sparkpost.com/docs/signals/segmentation/'
  },
  {
    condition: ({ p_14d_eng, c_14d }) => p_14d_eng < 0.15 && p_14d_eng >= 0.05 && showActionCondidtional(c_14d),
    content: (
      <>
        Subscribers who previously engaged are no longer engaging. Try digging into see if you can improve your first message's personalization.
      </>
    ),
    type: 'warning',
    link: 'https://www.sparkpost.com/docs/signals/welcome-campaign/'
  },
  {
    condition: ({ p_90d_eng, c_90d }) => p_90d_eng < 0.15 && showActionCondidtional(c_90d),
    content: (
      <>
        Not a lot of your semi-recently engaged recipients are engaging with your emails. This may be a sign you should refresh your content and send to them on a different frequency.
      </>
    ),
    type: 'warning',
    link: 'https://www.sparkpost.com/docs/signals/content-refresh/'
  },
  {
    condition: ({ p_365d_eng, c_90d }) => p_365d_eng < 0.05 && showActionCondidtional(c_90d),
    content: (
      <>
        Only a small number of your unengaged recipients are re-engaging. Consider introducing a re-engagement campaign to revive your relationship with those subscribers.
      </>
    ),
    type: 'bad',
    link: 'https://www.sparkpost.com/docs/signals/re-engagement-campaign/'
  },
  {
    condition: ({ p_365d_eng, c_365d }) => p_365d_eng < 0.15 && p_365d_eng >= 0.05 && showActionCondidtional(c_365d),
    content: (
      <>
        Not many of your unengaged recipients are re-engaging. Try introducing a re-engagement campaign to revive your relationship with those subscribers.
      </>
    ),
    type: 'warning',
    link: 'https://www.sparkpost.com/docs/signals/re-engagement-campaign/'
  },
  {
    condition: ({ p_uneng_eng, c_365d }) => p_uneng_eng < 0.02 && showActionCondidtional(c_365d),
    content: (
      <>
        Few of your recipients who never engaged in the past are changing their behavior. Consider removing these recipients to increase your engagement rate and drive better results.
      </>
    ),
    type: 'bad',
    link: 'https://www.sparkpost.com/docs/signals/list-hygiene/'
  },
  {
    condition: ({ p_new_eng, c_new }) => p_new_eng < 0.10 && showActionCondidtional(c_new),
    content: (
      <>
        Not a lot of new recipients are engaging with your email. Examine your sign up process – there may be areas to improve.
      </>
    ),
    type: 'bad',
    link: 'https://www.sparkpost.com/docs/signals/subscriber-acquisition/'
  },
  {
    condition: ({ p_new_eng, c_new }) => p_new_eng < 0.20 && p_new_eng >= 0.10 && showActionCondidtional(c_new),
    content: (
      <>
        Some new recipients aren't engaging with your email. Try setting up a welcome campaign to connect with your new subscribers.
      </>
    ),
    type: 'warning',
    link: 'https://www.sparkpost.com/docs/signals/welcome-campaign/'
  }
];

