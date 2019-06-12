import { useState, useEffect, useCallback } from 'react';
import qs from 'qs';

import useRouter from 'src/hooks/useRouter';

const toQueryString = (params) => qs.stringify(params, { arrayFormat: 'repeat' });

export const array = (item) => Array.isArray(item) ? item : [item];
export const boolean = (item) => item === 'true' ? true : false;
export const string = (param) => param;
export const number = (param) => Number(param) || 0;

const defaults = {
  [array]: [],
  [boolean]: false,
  [string]: '',
  [number]: 0
};

const getFieldType = (spec) => 'type' in spec ? spec.type : spec;
const convertField = (value, fldType) => getFieldType(fldType)(value);
const makeDefault = (fldType) => fldType.default ? fldType.default : defaults[getFieldType(fldType)];

const applySchema = (obj, schema) => {
  const updates = Object.entries(schema).reduce(
    (acc, [fldName, fldType]) =>
      fldName in obj
        ? { [fldName]: convertField(obj[fldName], fldType), ...acc }
        : { [fldName]: makeDefault(fldType), ...acc },
    {}
  );

  return { ...obj, ...updates };
};

/*
 * Parse query params based on the given spec and provide
 * an API to update those params.
 */
export const useQueryParams = (schema) => {
  const { location, history, requestParams } = useRouter();
  const [queryParams, setQueryParams] = useState(applySchema(requestParams, schema));

  useEffect(
    () => {
      setQueryParams(applySchema(requestParams, schema));
    },
    [setQueryParams, requestParams, schema]
  );

  const updateRoute = useCallback(
    (newParams) => {
      const queryString = toQueryString(newParams);
      history.push(`${location.pathname}?${queryString}`);
    },
    [history, location.pathname]
  );

  return { params: queryParams, setParams: updateRoute };
};
