import React, { createContext, useState, useContext } from 'react';
import _ from 'lodash';

import { Button } from '@sparkpost/matchbox';
import SupportTicketLink from 'src/components/supportTicketLink/SupportTicketLink';

const defaultContext = {};

const FeatureChangeContext = createContext(defaultContext);

export const FeatureChangeContextProvider = ({ children }) => {
  /**
   *
   * 1. Generate default state
   * 2. Generate value
   */

  const defaultAction = (key) => (
    <Button onClick={() => onComplete(key)}>Got it</Button>
  );

  const DEFAULT_QUESTIONS = [
    {
      key: 'dedicated-ips',
      label: 'Dedicated IPs',
      description: (<div>
        Your new plan doesn't include dedicated Ips.
        Your current IPs will now be billed at $20/month each,
        or you can <SupportTicketLink issueId="general_issue">
          submit a support ticket
        </SupportTicketLink> to delete them.
      </div>),
      action: (key) => defaultAction(key)
    }
  ];

  const initialState = {};
  DEFAULT_QUESTIONS.forEach(({ key }) => initialState[key] = false);
  const [ keys, setState ] = useState(initialState);

  const onComplete = (key) => {
    setState({
      ...keys,
      [key]: true
    });
  };

  const mappedActions = DEFAULT_QUESTIONS.map((feature) => ({
    ...feature,
    value: keys[feature.key]
  }));

  const value = {
    isReady: _.every(keys),
    features: mappedActions
  };

  return (
    <FeatureChangeContext.Provider value={value}>
      {children}
    </FeatureChangeContext.Provider>
  );
};

export const useFeatureChangeContext = () => useContext(FeatureChangeContext);

export default FeatureChangeContext;
