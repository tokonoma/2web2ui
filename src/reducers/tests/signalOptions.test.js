import cases from 'jest-in-case';
import signalOptionsReducer from '../signalOptions';

jest.mock('src/helpers/signals', () => ({
  getDates: jest.fn((a) => a)
}));

cases('Signal Options Reducer', ({ name, ...action }) => {
  const nextState = signalOptionsReducer(undefined, action);
  expect(nextState).toMatchSnapshot();
}, {
  'when init': {},
  'when relativeRange changes': {
    type: 'CHANGE_SIGNAL_OPTIONS',
    payload: {
      relativeRange: '7days'
    }
  }
});
