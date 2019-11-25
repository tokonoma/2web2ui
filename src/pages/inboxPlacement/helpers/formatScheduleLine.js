
import moment from 'moment';
import { STATUS, DURATION_HOURS } from '../constants/test';
import { FORMATS } from 'src/constants';

const formatDateTime = (start_time) => moment(start_time).format(FORMATS.LONG_DATETIME_ALT);
const getHoursRemaining = (start_time) => moment(start_time).add(DURATION_HOURS, 'hours').diff(moment(), 'hours');

export default function formatScheduleLine(status, start_time, end_time) {
  const formatted_start_time = formatDateTime(start_time);

  switch (status) {
    case STATUS.RUNNING: {
      return `Sent ${formatted_start_time} and ${getHoursRemaining(start_time)} hours remaining on test`;
    }
    case STATUS.STOPPED: {
      return `Sent ${formatted_start_time} and Stopped ${formatDateTime(end_time)}`;
    }
    case STATUS.COMPLETED: {
      return `Sent ${formatted_start_time} and Completed ${formatDateTime(end_time)}`;
    }
    default: {
      return `Sent ${formatted_start_time} and test status unknown`;
    }
  }
}
