import React, { createContext, useContext, useEffect } from 'react';
import _ from 'lodash';

const ChangePlanContext = createContext({});

export const ChangePlanProvider = ({
  children,
  //Redux actions
  getBillingCountries,
  getBillingInfo,
  getBundles,
  getPlans,

  //Redux props
  ...value
}) => {
  useEffect(() => { getBillingCountries(); }, [getBillingCountries]);
  useEffect(() => { getBillingInfo(); }, [getBillingInfo]);
  useEffect(() => { getBundles(); }, [getBundles]);
  useEffect(() => { getPlans(); }, [getPlans]);

  const contextValue = {
    ...value
  };
  return (
    <ChangePlanContext.Provider value={contextValue}>
      {children}
    </ChangePlanContext.Provider>
  );
};

export const useChangePlanContext = () => useContext(ChangePlanContext);

export default ChangePlanContext;
