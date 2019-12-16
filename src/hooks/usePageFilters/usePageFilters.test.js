import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import useRouter from '../useRouter';
import usePageFilters, { flattenParameters, unflattenParameters } from '../usePageFilters';

jest.mock('src/hooks/useRouter');

const whitelist = {
  foo: {
    validate: Array.isArray,
    defaultValue: ['a', 'b', 'c'],
  },
  page: {
    validate: page => !isNaN(page) && page >= 0,
    defaultValue: 1,
    normalize: val => val * 1,
  },
  object: {
    validate: ({ a, b }) => {
      return a <= b;
    },
    defaultValue: {
      a: 1,
      b: 3,
    },
  },
  test: {
    defaultValue: 5,
    excludeFromRoute: true,
    validate: val => val === 5,
    normalize: val => val * 1,
  },
};

const initFilterObject = {
  foo: ['a', 'b', 'c'],
  page: 1,
  object: {
    a: 1,
    b: 3,
  },
  test: 5,
};

const initRouteObject = {
  foo: ['a', 'b', 'c'],
  page: 1,
  a: 1,
  b: 3,
};

const defaultFunc = () => {};

describe('flattenParameters', () => {
  it('flattens an object', () => {
    const flattened = flattenParameters({
      foo: ['a', 'b', 'c'],
      page: 1,
      object: {
        a: 1,
        b: 3,
      },
    });
    expect(flattened).toEqual({
      foo: ['a', 'b', 'c'],
      page: 1,
      a: 1,
      b: 3,
    });
  });
});

describe('unflattenParameters', () => {
  it('unflattens an object based on a whitelist', () => {
    const unflattened = unflattenParameters(
      {
        foo: ['a', 'b', 'c'],
        page: 1,
        a: 1,
        b: 3,
      },
      whitelist,
    );
    expect(unflattened).toEqual({
      foo: ['a', 'b', 'c'],
      page: 1,
      object: {
        a: 1,
        b: 3,
      },
    });
  });
});

describe('usePageFilters', () => {
  const updateRoute = jest.fn();
  const MockComponent = ({ getFilters, getUpdateFilters, getResetFilters }) => {
    useRouter.mockReturnValue({
      requestParams: initFilterObject,
      updateRoute,
    });
    const { filters, updateFilters, resetFilters } = usePageFilters(whitelist);

    getUpdateFilters(updateFilters);
    getFilters(filters);
    getResetFilters(resetFilters);

    return null;
  };

  const subject = ({
    getFilters = defaultFunc,
    getUpdateFilters = defaultFunc,
    getResetFilters = defaultFunc,
  }) =>
    mount(
      <MockComponent
        getFilters={getFilters}
        getUpdateFilters={getUpdateFilters}
        getResetFilters={getResetFilters}
      />,
    );

  it('hydrates filters on mount', () => {
    let filters;
    const getFilters = f => (filters = f);
    subject({ getFilters });
    expect(filters).toEqual(initFilterObject);
  });

  it('updates filters and url when using update function', () => {
    let filters;
    const getFilters = f => (filters = f);
    let updateFunc;
    const getUpdateFilters = f => (updateFunc = f);
    subject({ getFilters, getUpdateFilters });
    act(() => updateFunc({ page: 2 }));

    const expectedRoute = {
      foo: ['a', 'b', 'c'],
      page: 2,
      a: 1,
      b: 3,
    };

    const expectedFilters = {
      foo: ['a', 'b', 'c'],
      page: 2,
      object: {
        a: 1,
        b: 3,
      },
      test: 5,
    };

    expect(updateRoute).toHaveBeenCalledWith(expectedRoute);
    expect(filters).toEqual(expectedFilters);
  });

  it("doesn't update invalid filters and url when using update function", () => {
    let filters;
    const getFilters = f => (filters = f);
    let updateFunc;
    const getUpdateFilters = f => (updateFunc = f);
    subject({ getFilters, getUpdateFilters });
    act(() => updateFunc({ page: 'abcdefg' }));
    expect(updateRoute).toHaveBeenCalledWith(initRouteObject);
    expect(filters).toEqual(initFilterObject);
  });

  it('resets filters and url when reset function is called', () => {
    let filters;
    const getFilters = f => (filters = f);
    let updateFunc;
    const getUpdateFilters = f => (updateFunc = f);
    let resetFunc;
    const getResetFilters = f => (resetFunc = f);
    subject({ getFilters, getUpdateFilters, getResetFilters });
    act(() => updateFunc({ page: 1, foo: ['bar', 'baz'] }));
    act(() => resetFunc());
    expect(filters).toEqual(initFilterObject);
    expect(updateRoute).toHaveBeenCalledWith(initRouteObject);
  });
});
