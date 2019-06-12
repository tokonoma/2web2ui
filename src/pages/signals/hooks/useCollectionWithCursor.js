import { useState, useEffect } from 'react';

const comparableJson = (obj) => JSON.stringify(Object.keys(obj).sort().map((key) => ({ [key]: obj[key] })));

const useCollectionWithCursor = ({
  filters: initialFilters = {},
  page: initialPage,
  perPage: initialPerPage,
  loadItems,
  onLoadError
}) => {
  const [items, setItems] = useState(null);
  const [filters, setFilters] = useState(() => initialFilters);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, goToPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  useEffect(
    () => {
      setItems(null);
      loadItems({ filters, page, perPage })
        .then((newItems) => {
          setItems(newItems.items);
          setTotalCount(newItems.totalCount);
          setHasMore(Boolean(newItems.extra.links.next));
        })
        .catch((err) => {
          onLoadError(err);
        });
    },
    [comparableJson(filters), loadItems, onLoadError, page, perPage, setItems, setTotalCount] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return {
    loading: items === null,
    items,
    page,
    perPage,
    filters,
    setFilters,
    totalCount,
    hasMore,
    goToPage,
    setPerPage
  };
};

export default useCollectionWithCursor;
