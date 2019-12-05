import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import useRouter from '../useRouter';
import usePageFilters from '../usePageFilters';

jest.mock('src/hooks/useRouter');

const initQueryObject = {
  offset: 25,
  foo: ['a', 'b', 'c'],
  page: 1,
};

const updatedQueryObject = {
  offset: 25,
  foo: ['a', 'b', 'c'],
  page: 2,
};

const defaultFunc = () => {};

describe('usePageFilters', () => {
  const updateRoute = jest.fn();
  const MockComponent = ({ getFilters, getUpdateFilters, getResetFilters }) => {
    useRouter.mockReturnValue({
      requestParams: initQueryObject,
      updateRoute,
    });
    const { filters, updateFilters, resetFilters } = usePageFilters({
      foo: {
        validate: Array.isArray,
        defaultValue: ['a', 'b', 'c'],
      },
      offset: {
        validate: offset => !isNaN(offset) && offset >= 0,
        defaultValue: 25,
      },
      page: {
        validate: page => !isNaN(page) && page >= 0,
        defaultValue: 1,
      },
    });

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
    expect(filters).toEqual(initQueryObject);
  });

  it('updates filters and url when using update function', () => {
    let filters;
    const getFilters = f => (filters = f);
    let updateFunc;
    const getUpdateFilters = f => (updateFunc = f);
    subject({ getFilters, getUpdateFilters });
    act(() => updateFunc({ page: 2 }));
    expect(updateRoute).toHaveBeenCalledWith(updatedQueryObject);
    expect(filters).toEqual(updatedQueryObject);
  });

  it("doesn't update invalid filters and url when using update function", () => {
    let filters;
    const getFilters = f => (filters = f);
    let updateFunc;
    const getUpdateFilters = f => (updateFunc = f);
    subject({ getFilters, getUpdateFilters });
    act(() => updateFunc({ page: 'abcdefg' }));
    expect(updateRoute).toHaveBeenCalledWith(initQueryObject);
    expect(filters).toEqual(initQueryObject);
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
    expect(filters).toEqual(initQueryObject);
    expect(updateRoute).toHaveBeenCalledWith(initQueryObject);
  });
});
