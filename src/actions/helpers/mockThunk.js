const mockThunk = (action, { data: response, resolve = true, delay }) => (dispatch) => {
  const { type, ...rest } = action;

  const finish = () => {
    dispatch({
      type: resolve ? `${type}_SUCCESS` : `${type}_FAIL`,
      ...rest,
      payload: response
    });
    return resolve ? Promise.resolve(response) : Promise.reject(response);
  };

  if (delay) {
    return new Promise((pResolve, reject) => {
      dispatch({
        type: `${type}_PENDING`
      });
      setTimeout(() => {
        dispatch({
          type: resolve ? `${type}_SUCCESS` : `${type}_FAIL`,
          ...rest,
          payload: response
        });
        if (resolve) {
          pResolve(response);
        } else {
          reject(response);
        }
      }, delay);
    });
  }

  return finish();
};

export default mockThunk;
