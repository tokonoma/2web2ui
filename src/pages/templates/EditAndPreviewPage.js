import React from 'react';
import { RedirectAndAlert } from 'src/components/globalAlert';
import FullPage from 'src/components/fullPage';
import Loading from 'src/components/loading';
import EditNavigation from './components/EditNavigation';
import links from './constants/editNavigationLinks';
import useEditorContext from './hooks/useEditorContext';

const EditAndPreviewPage = () => {
  const { currentNavigationIndex, draft, hasDraftFailedToLoad, isDraftLoading } = useEditorContext();
  const Contents = links[currentNavigationIndex].render;
  const PrimaryArea = links[currentNavigationIndex].renderPrimaryArea;

  if (hasDraftFailedToLoad) {
    return (
      <RedirectAndAlert
        to="/templates"
        alert={{ type: 'error', message: 'Unable to load template' }}
      />
    );
  }

  if (isDraftLoading) {
    return <Loading />;
  }

  return (
    <FullPage
      breadcrumbRedirectsTo="/templates"
      title={draft.name}
    >
      <EditNavigation primaryArea={<PrimaryArea />} />
      <Contents />
    </FullPage>
  );
};

export default EditAndPreviewPage;
