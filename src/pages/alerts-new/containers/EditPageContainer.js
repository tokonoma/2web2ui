import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateAlert } from 'src/actions/alerts';

export class EditPageContainer extends Component {
  render() {
    const { component: Component } = this.props;

    //this.props.updateAlert('123', {'foo': 'bar'});
    return <Component />;
  }
}

function withAlertsEdit(WrappedComponent) {
  const Wrapper = (props) => (
    <EditPageContainer {...props} component={WrappedComponent} />
  );

  Wrapper.displayName = `withAlertsEdit(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const mapStateToProps = (state, props) => ({
    edit: state.alerts.edit
  });

  return withRouter(connect(mapStateToProps, { updateAlert })(Wrapper));
}

export default withAlertsEdit;
