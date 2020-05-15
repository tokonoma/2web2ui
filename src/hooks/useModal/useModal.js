import { useReducer } from 'react';

const CLOSE = 'close';
const OPEN = 'open';

const reducer = (state, action = {}) => {
  return {
    isModalOpen: action.type === OPEN,
    // stash some metadata about the thing being displayed
    meta: action.meta,
  };
};

const useModal = () => {
  const [state, dispatch] = useReducer(reducer, reducer());
  const closeModal = () => dispatch({ type: CLOSE });
  const openModal = meta => dispatch({ type: OPEN, meta });

  return { ...state, closeModal, openModal };
};

export default useModal;
