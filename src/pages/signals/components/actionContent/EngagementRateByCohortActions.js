import React from 'react';
import Actions from '../Actions';
import { content, contentTotalEngagement, contentGood } from '../../constants/engagementRateByCohortContent';

const EngagementRateByCohortActions = ({ engagementByCohort, recencyByCohort, date, facet, facetId }) => {
  let actions = [];

  //First check total engagement because it needs to pass along subaccount id to generate a link
  if (contentTotalEngagement.condition(engagementByCohort)) {
    actions.push({
      content: contentTotalEngagement.content,
      type: contentTotalEngagement.type,
      link: contentTotalEngagement.link(facet, facetId)
    });
  }

  content.forEach(({ condition, ...rest }) => {
    if (condition({ ...engagementByCohort, ...recencyByCohort })) {
      actions.push(rest);
    }
  });
  actions = actions.slice(0, 3);

  //If there no adverse actions, show the good job message.
  if (actions.length === 0) {
    actions.push(contentGood);
  }

  return <Actions actions={actions} date={date} empty={engagementByCohort.p_total_eng === null} />;
};

export default EngagementRateByCohortActions;
