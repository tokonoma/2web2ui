import React from 'react';
import Actions from '../Actions';
import content from '../../constants/ComplaintsByCohortContent';

const ComplaintsByCohortActions = ({ complaintsByCohort, recencyByCohort, date }) => {
  let actions = [];

  content.forEach(({ condition, actionFn }) => {
    if (condition({ ...complaintsByCohort, ...recencyByCohort })) {
      actions.push(actionFn({ ...complaintsByCohort, ...recencyByCohort }));
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
  return <Actions actions={actions} date={date} empty={complaintsByCohort.p_total_fbl === null}/>;
};

export default ComplaintsByCohortActions;
