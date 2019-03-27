import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import withFormName from 'src/components/withFormName';
import SubaccountSection from './SubaccountSection';

const mapStateToProps = (state, props) => {
  const selector = formValueSelector(props.formName);

  return {
    assignTo: selector(state, 'assignTo'),
    subaccountId: selector(state, 'subaccount_id')
  };
};

const connectedComponent = withFormName(connect(mapStateToProps, { change })(SubaccountSection));
connectedComponent.displayName = 'SubaccountSection';
export default connectedComponent;
