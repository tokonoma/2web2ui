import { useMemo } from 'react';
import useRouter from 'src/hooks/useRouter';
import links from '../constants/editNavigationLinks';

const useEditorNavigation = () => {
  const { history, requestParams: { id, navKey = '' }} = useRouter();
  const setNavigation = (nextNavigationKey) => {
    history.push(`/templates/edit/${id}/next/${nextNavigationKey}`);
  };

  return useMemo(() => {
    let index = links.findIndex((link) => link.routeKey === navKey.toLowerCase());

    if (index === -1) { // no match
      index = 0;
    }

    return {
      currentNavigationIndex: index,
      currentNavigationKey: links[index].key,
      setNavigation
    };
  }, [navKey, setNavigation]);
};

export default useEditorNavigation;
