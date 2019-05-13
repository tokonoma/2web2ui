import React from 'react';
import Actions from '../Actions';
import content from '../../constants/unsubscribeRateByCohortContent';

const UnsubscribeRateByCohortActions = ({ unsubscribeByCohort, recencyByCohort, date }) => {
  let actions = [];

  content.forEach(({ condition, actionFn }) => {
    if (condition({ ...unsubscribeByCohort, ...recencyByCohort })) {
      actions.push(actionFn(unsubscribeByCohort));
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
  return <Actions actions={actions} date={date} empty={unsubscribeByCohort.p_total_unsub === null}/>;
};

export default UnsubscribeRateByCohortActions;
