import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

// note, use caution when setting the debounce interval, content-previewer endpoint is old and not
//   built for heavy traffic
const debouncer = debounce((fn) => fn(), 1000);

// tracks changes to content and requests preview update
const useEditorPreview = ({
  content,
  draft = {},
  getPreview,
  debounceAction = debouncer,
  getParsedTestData
}) => {
  const [previewDevice, setPreviewDevice] = useState('desktop');

  useEffect(() => {
    if (!isEmpty(content)) {
      debounceAction(() => {
        const parsedTestData = getParsedTestData();

        getPreview({
          id: draft.id,
          content,
          mode: 'draft',
          subaccountId: draft.subaccount_id,
          substitution_data: parsedTestData.substitution_data
        });
      });
    }
  },
  [getPreview, content, debounceAction, draft.id, draft.subaccount_id, getParsedTestData]);

  // clean-up debounced state when unmounted
  useEffect(() => () => { debounceAction.cancel(); }, [debounceAction]);

  return {
    previewDevice,
    setPreviewDevice
  };
};

export default useEditorPreview;
