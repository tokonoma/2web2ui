import React from 'react';
import Actions from '../Actions';
import content from '../../constants/ComplaintsByCohortContent';

const ComplaintsByCohortActions = ({ cohorts, cohortsRecency, date }) => {
  let actions = [];

  content.forEach(({ condition, actionFn }) => {
    if (condition({ ...cohorts, ...cohortsRecency })) {
      actions.push(actionFn(cohorts));
    }
  });
  actions = actions.slice(0, 3);

  //If there no adverse actions, show the good job message.
  if (actions.length === 0) {
    actions.push(
      { content: (
        <>
          Your complaint rates are low across the board. Great job!
        </>
      ),
      type: 'good' }
    );
  }
  return <Actions actions={actions} date={date} empty={cohorts.p_total_fbl === null}/>;
};

export default ComplaintsByCohortActions;
