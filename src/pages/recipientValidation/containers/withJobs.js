import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getList } from 'src/actions/recipientValidation';
import { getDisplayName } from 'src/helpers/hoc';
import { selectRecipientValidationJobs } from 'src/selectors/recipientValidation';

export const Container = ({ component: Component, getList, jobs }) => {
  useEffect(() => {
    getList();
  }, [getList]);

  return <Component jobs={jobs} />;
};

const withPollingJobs = (WrappedComponent) => {
  const Wrapper = (props) => (
    <Container {...props} component={WrappedComponent} />
  );

  Wrapper.displayName = getDisplayName(WrappedComponent, 'withJobs');

  const mapStateToProps = (state) => ({
    jobs: selectRecipientValidationJobs(state)
  });

  const mapDispatchToProps = {
    getList
  };

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};

export default withPollingJobs;
