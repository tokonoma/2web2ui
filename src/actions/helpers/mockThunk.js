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

  return finish();
};

export default mockThunk;
