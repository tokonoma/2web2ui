import debugLog from 'src/__testHelpers__/debugLog';

const defaultResponse = {
  data: {
    success: true,
    results: []
  }
};

const basePath = 'src/__testHelpers__/http-responses/';

const responseLayers = [];

// To override one or more default mock responses, call use('pathToOverrides') and
// put your override implementation(s) in ${basePath}/pathToOverrides/<URL>/<METHOD>.js
export const use = (responsesPath) => responseLayers.unshift(`${basePath}${responsesPath}`);

// The default mock API responses are stored under `${basePath}/default/`
use('default');

debugLog('DEBUG MODE ON');

// Here we search each layer in turn for a mock for the given HTTP request.
// We assume the last layer is `default` and that it contains responses for all required requests.
export const lookupResponse = (request) => {
  const { method, url } = request;
  const responseSubPath = `/${url}/${method.toLowerCase()}`.replace('//', '/');
  let storedResponse;

  const responsePath = responseLayers.find((resPath) => {
    try {
      require.resolve(`${resPath}${responseSubPath}`);
      return true;
    } catch (e) {
      return false;
    }
  });

  if (responsePath) {
    try {
      storedResponse = require(`${responsePath}${responseSubPath}`);
    } catch (err) {
      // ignore require errors
      debugLog(`Failed to load response (${responsePath}) for ${method} ${url}`);
    }
  } else {
    debugLog(`No stored response for ${method} ${url}`);
  }

  if (storedResponse && storedResponse.default) {
    debugLog(`Stored response found for ${method} ${url}`);
    return { data: storedResponse.default(request) };
  } else {
    return defaultResponse;
  }
};
