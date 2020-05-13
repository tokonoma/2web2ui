import formatScheduleLine from '../formatScheduleLine';
import moment from 'moment';

let formatLine;
let status;
let start_time;
let end_time;

describe('Promo Code async validator', () => {
  beforeEach(() => {
    const date = moment(new Date('2019-08-10T12:30:00-04:00'));
    Date.now = jest.fn(() => date);
    status = 'running';
    start_time = '2019-08-09T12:30:00-04:00';
    end_time = '2019-08-11T12:30:00-04:00';
    formatLine = formatScheduleLine;
  });

  it('should format start time and hours left for running test', () => {
    expect(formatLine(status, start_time, end_time)).toMatchSnapshot();
  });

  it('should format stopped test', () => {
    status = 'stopped';
    end_time = '2019-08-09T18:30:00-04:00';
    expect(formatLine(status, start_time, end_time)).toMatchSnapshot();
  });

  it('should format completed test', () => {
    status = 'completed';
    end_time = '2019-08-09T20:30:00-04:00';
    expect(formatLine(status, start_time, end_time)).toMatchSnapshot();
  });

  it('handle error state gracefully where status is unknown', () => {
    status = 'say_what?';
    expect(formatLine(status, start_time, end_time)).toMatchSnapshot();
  });
});
