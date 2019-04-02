import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import { verify } from 'src/actions/sendingDomains';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import { hasAutoVerifyEnabledSelector } from 'src/selectors/account';
import { selectCondition } from 'src/selectors/accessConditionState';
import BounceSetupInstructionPanel from './BounceSetupInstructionPanel';

const mapStateToProps = (state) => ({
  hasAutoVerifyEnabled: hasAutoVerifyEnabledSelector(state),
  isByoipAccount: selectCondition(hasAccountOptionEnabled('byoip_customer'))(state),
  loading: state.sendingDomains.verifyBounceLoading
});

const mapDispatchToProps = { showAlert, verify };

export default connect(mapStateToProps, mapDispatchToProps)(BounceSetupInstructionPanel);
