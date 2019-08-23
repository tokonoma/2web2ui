import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getList } from 'src/actions/recipientValidation';
import { PollContext } from 'src/context/Poll';
import withContext from 'src/context/withContext';
import { getDisplayName } from 'src/helpers/hoc';
import { selectRecipientValidationJobs } from 'src/selectors/recipientValidation';

export const Container = ({ component: Component, getList, jobs, startPolling, stopPolling }) => {
  useEffect(() => {
    getList(); // polling doesn't start immediately

    startPolling({
      key: 'recipient-validation-jobs',
      action: () => { getList(); },
      interval: 10000
    });

    return () => {
      stopPolling('recipient-validation-jobs');
    };
  }, [getList, startPolling, stopPolling]);

  return <Component jobs={jobs} />;
};

const withPollingJobs = (WrappedComponent) => {
  const Wrapper = (props) => (
    <Container {...props} component={WrappedComponent} />
  );

  Wrapper.displayName = getDisplayName(WrappedComponent, 'withPollingJobs');

  const mapStateToProps = (state) => ({
    jobs: selectRecipientValidationJobs(state)
  });

  const mapDispatchToProps = {
    getList
  };

  return connect(mapStateToProps, mapDispatchToProps)(withContext(PollContext, Wrapper));
};

export default withPollingJobs;
