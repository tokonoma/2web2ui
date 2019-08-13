import { STATUS } from '../constants/test';

export default function getStatusProps(status) {

  switch (status) {
    case STATUS.RUNNING: {
      return {
        fill: '#2AC995',
        tooltip: 'In Progress'
      };
    }
    case STATUS.STOPPED: {
      return {
        fill: '#FF594D',
        tooltip: 'Test Stopped'
      };
    }
    case STATUS.COMPLETED:
    default: {
      return {
        fill: '#FFFFFF',
        tooltip: ''
      };
    }
  }
}
