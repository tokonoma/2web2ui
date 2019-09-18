const mockThunk = (action, response = {}, resolve = true) => (dispatch) => {
  const { type, ...rest } = action;
  dispatch({
    type: resolve ? `${type}_SUCCESS` : `${type}_FAIL`,
    ...rest,
    payload: response
  });
  return resolve ? Promise.resolve(response) : Promise.reject(response);
};

export default mockThunk;
