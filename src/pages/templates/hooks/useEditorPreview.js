import { useEffect } from 'react';
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
  preview = {},
  debounceAction = debouncer
}) => {
  useEffect(() => {
    if (!isEmpty(content)) {
      debounceAction(() => {
        getPreview({
          id: draft.id,
          content,
          mode: 'draft',
          subaccountId: draft.subaccount_id,
          substitution_data: {}
        });
      });
    }
  }, [getPreview, content, debounceAction, draft.id, draft.subaccount_id]);

  // clean-up debounced state when unmounted
  useEffect(() => () => { debounceAction.cancel(); }, [debounceAction]);

  return { preview };
};

export default useEditorPreview;
