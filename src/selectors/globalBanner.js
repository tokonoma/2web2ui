import moment from 'moment';
import { onPlan } from 'src/helpers/conditions/account';
import { selectCondition } from 'src/selectors/accessConditionState';

const cancelBannerPaths = ['/account/billing', '/account/settings'];

export function selectTargetBanner(state, props) {
  const { account } = state;
  const { loading, pending_cancellation } = account;

  if (loading) return undefined;

  if (
    // Cancellation is pending...
    pending_cancellation &&
    // ...and is within 7 days of cancellation...
    (moment.duration(moment(pending_cancellation.effective_date).diff(moment.utc(), 'days')) < 7 ||
      // ...or on certain paths regardless of when cancellation will occur
      cancelBannerPaths.includes(props.location.pathname))
  ) {
    return 'pending-cancellation';
  }

  if (
    !pending_cancellation &&
    (selectCondition(onPlan('free500-0419'))(state) ||
      selectCondition(onPlan('free500-SPCEU-0419'))(state))
  ) {
    return 'upgrade';
  }

  return undefined;
}
