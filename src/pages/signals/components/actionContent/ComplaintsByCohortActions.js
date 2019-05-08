import React, { Fragment } from 'react';
import Actions from '../Actions';
import content from '../../constants/ComplaintsByCohortContent';

const ComplaintsByCohortActions = ({ cohorts, date }) => {
  let actions = [];

  content.forEach(({ condition, actionFn }) => {
    if (condition(cohorts)) {
      actions.push(actionFn(cohorts));
    }
  });
  actions = actions.slice(0, 3);

  //If there no adverse actions, show the good job message.
  if (actions.length === 0) {
    actions.push(
      { content: (
        <Fragment>
          Your complaint rates are low across the board. Great job!
        </Fragment>
      ),
      type: 'good' }
    );
  }
  return <Actions actions={actions} date={date} empty={cohorts.p_total_fbl === null}/>;
};

export default ComplaintsByCohortActions;
