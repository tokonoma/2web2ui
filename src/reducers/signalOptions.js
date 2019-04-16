import { getDates } from 'src/helpers/signals';

const DEFAULT_RANGE = '90days';
const initialState = getDates({ relativeRange: DEFAULT_RANGE });

const signalOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SIGNAL_OPTIONS':
      return { ...state, ...action.payload };
  }

  return state;
};

export default signalOptionsReducer;
