const mockThunk = (action, response = {}, resolve = true) => (dispatch) => {
  dispatch(action);
  return resolve ? Promise.resolve(response) : Promise.reject(response);
};

export default mockThunk;
