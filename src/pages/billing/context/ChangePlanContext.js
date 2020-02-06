import React, { createContext, useContext, useEffect, useMemo } from 'react';
import _ from 'lodash';

const ChangePlanContext = createContext({});

export const ChangePlanProvider = ({
  children,
  //Redux actions
  getBillingCountries,
  getBillingInfo,
  getBundles,
  getPlans,
  getSubscription,

  //Redux props
  loading,
  rawPlans: plans,
  ...value
}) => {
  useEffect(() => {
    getBillingCountries();
  }, [getBillingCountries]);
  useEffect(() => {
    getSubscription();
  }, [getSubscription]);
  useEffect(() => {
    getBillingInfo();
  }, [getBillingInfo]);
  useEffect(() => {
    getBundles({ type: 'messaging' });
  }, [getBundles]);
  useEffect(() => {
    getPlans();
  }, [getPlans]);

  const plansByKey = useMemo(() => _.keyBy(plans, 'plan'), [plans]);

  const contextValue = {
    ...value,
    getSubscription,
    loading,
    plans: plansByKey,
  };
  return <ChangePlanContext.Provider value={contextValue}>{children}</ChangePlanContext.Provider>;
};

export const useChangePlanContext = () => useContext(ChangePlanContext);

export default ChangePlanContext;
