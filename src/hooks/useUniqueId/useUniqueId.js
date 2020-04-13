import { useMemo } from 'react';
import uniqueId from 'lodash/uniqueId';

const useUniqueId = prefix => useMemo(() => uniqueId(prefix ? `${prefix}-` : undefined), [prefix]);

export default useUniqueId;
