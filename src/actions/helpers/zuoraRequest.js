import requestHelperFactory from './requestHelperFactory';
import _ from 'lodash';
import { zuora as zuoraAxios } from 'src/helpers/axiosInstances';
import ErrorTracker from 'src/helpers/errorTracker';
import { showAlert } from 'src/actions/globalAlert';
import { stripTags } from 'src/helpers/string';

export default requestHelperFactory({
  request: zuoraAxios,
  onSuccess: ({ types, response, dispatch, meta }) => {
    if (!response.data.success) {
      try {
        const message = _.get(
          response,
          'data.reasons[0].message',
          'An error occurred while contacting the billing service',
        );
        const sanitizedMessage = stripTags(message); // some messages include html tags
        const error = new Error(sanitizedMessage);
        error.name = 'ZuoraApiError';
        error.response = response;

        dispatch({
          type: types.FAIL,
          payload: { error, message: sanitizedMessage, response },
          meta,
        });

        // auto alert all errors
        dispatch(showAlert({ type: 'error', message: sanitizedMessage }));

        // TODO: 'return' err once we unchain all actions
        ErrorTracker.addRequestContextAndThrow(types.FAIL, response, error);
      } catch (err) {
        ErrorTracker.report('zuora-request-error', err);
      }
    }

    dispatch({
      type: types.SUCCESS,
      payload: response,
      meta,
    });

    return meta.onSuccess ? dispatch(meta.onSuccess({ results: response })) : response;
  },
  onFail: ({ types, err, dispatch }) => {
    dispatch(showAlert({ type: 'error', message: 'An error occurred while contacting zuora' }));
    //report 4xx and 5xx errors to sentry
    ErrorTracker.addRequestContextAndThrow(types.FAIL, err.response, err);
  },
});
