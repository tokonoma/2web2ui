import { useEffect, useRef } from 'react';

/**
 * To be used in case we want to do something _only_ on component update
 * as opposed to on mount _and_ on update, which is the default behavior
 * of the useEffect hook
 */
const useEffectAfterMounting = (callback, dependencies) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current === true) {
      return callback();
    }
    isMounted.current = true;
  }, [callback, dependencies]);
};

export default useEffectAfterMounting;
