import { useMemo } from 'react';
import useRouter from 'src/hooks/useRouter';
import links from '../constants/editNavigationLinks';
import { routeNamespace } from '../constants/routes';

const useEditorNavigation = () => {
  const { history, requestParams: { id, navKey = '' }} = useRouter();
  const setNavigation = (nextNavigationKey) => {
    history.push(`/${routeNamespace}/edit/${id}/${nextNavigationKey}`);
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
