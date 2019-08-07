
import moment from 'moment-timezone';
import { STATUS, DURATION_HOURS } from '../constants/test';

const formatDateTime = (start_time) => moment(start_time).format('MMM DD, YYYY [at] h:ma');
const getHoursRemaining = (start_time) => moment(start_time).add(DURATION_HOURS, 'hours').diff(moment(), 'hours');

export default function formatScheduleLine(status, start_time, end_time) {
  const formatted_start_time = formatDateTime(start_time);
  let formatted_remaining;

  switch (status) {
    case STATUS.RUNNING: {
      const hours_remaining = getHoursRemaining(start_time);
      formatted_remaining = ` and ${hours_remaining} hours remaining on test`;
      break;
    }
    case STATUS.STOPPED: {
      formatted_remaining = ` and stopped at ${formatDateTime(end_time)}`;
      break;
    }
    case STATUS.COMPLETED: {
      formatted_remaining = ` and completed at ${formatDateTime(end_time)}`;
      break;
    }
    default: {
      formatted_remaining = '. Test status unknown.';
    }
  }

  return `Sent ${formatted_start_time}${formatted_remaining}`;
}
