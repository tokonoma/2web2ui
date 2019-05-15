import { useMemo } from 'react';
import useRouter from 'src/hooks/useRouter';
import tabs from '../constants/editTabs';

const useEditorTabs = () => {
  const router = useRouter();

  // find current tab with route param
  return useMemo(() => {
    let index = tabs.findIndex((tab) => (
      tab.routeKey === (router.requestParams.tabKey || '').toLowerCase()
    ));

    if (index === -1) { // no match
      index = 0;
    }

    return {
      currentTabIndex: index,
      currentTabKey: tabs[index].key,
      setTab: (nextTabIndex) => {
        router.history.push(`/templates/edit/amp/next/${tabs[nextTabIndex].routeKey}`);
      }
    };
  }, [router.history, router.requestParams.tabKey]);
};

export default useEditorTabs;
