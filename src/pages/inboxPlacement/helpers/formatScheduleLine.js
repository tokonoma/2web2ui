
import moment from 'moment';
import { STATUS, DURATION_HOURS } from '../constants/test';

const formatDateTime = (start_time) => moment(start_time).format('MMM DD, YYYY [at] h:mma');
const getHoursRemaining = (start_time) => moment(start_time).add(DURATION_HOURS, 'hours').diff(moment(), 'hours');

export default function formatScheduleLine(status, start_time, end_time) {
  const formatted_start_time = formatDateTime(start_time);

  switch (status) {
    case STATUS.RUNNING: {
      return `Sent ${formatted_start_time} and ${getHoursRemaining(start_time)} hours remaining on test`;
    }
    case STATUS.STOPPED: {
      return `Sent ${formatted_start_time} and stopped at ${formatDateTime(end_time)}`;
    }
    case STATUS.COMPLETED: {
      return `Sent ${formatted_start_time} and completed at ${formatDateTime(end_time)}`;
    }
    default: {
      return `Sent ${formatted_start_time} and test status unknown`;
    }
  }
}
