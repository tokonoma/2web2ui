import { STATUS } from '../constants/test';

export default function getStatusProps(status) {
  let fill;
  let tooltip;

  switch (status) {
    case STATUS.RUNNING: {
      fill = '#2AC995';
      tooltip = 'In Progress';
      break;
    }
    case STATUS.STOPPED: {
      fill = '#FF594D';
      tooltip = 'Test Stopped';
      break;
    }
    case STATUS.COMPLETED:
    default: {
      fill = '#FFFFFF';
      tooltip = '';
      break;
    }
  }

  return { fill, tooltip };
}
