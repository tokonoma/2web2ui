import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import ampValidator from 'third/ampValidator';

const debouncer = debounce((fn) => fn(), 500);

const useEditorAnnotations = ({ content: { amp_html = '' }, debounceEvent = debouncer }) => {
  const [ampHtmlValidatorErrors, setAmpHtmlValidatorErrors] = useState([]);

  useEffect(() => {
    debounceEvent(() => {
      const { errors } = ampValidator.validateString(amp_html, 'AMP4EMAIL');
      const nextErrors = errors.map((error) => ({
        line: error.line,
        message: ampValidator.renderErrorMessage(error)
      }));

      setAmpHtmlValidatorErrors(nextErrors);
    });
  }, [amp_html, debounceEvent]);

  // clean-up debounced state when unmounted
  useEffect(() => () => { debounceEvent.cancel(); }, [debounceEvent]);

  return {
    annotations: {
      amp_html: ampHtmlValidatorErrors,
      html: [], // todo
      text: [] // todo
    }
  };
};

export default useEditorAnnotations;
