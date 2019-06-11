import { useState, useEffect } from 'react';

import { DEFAULT_PER_PAGE_BUTTONS } from 'src/constants';

const useCollectionWithCursor = ({ initialFilters = {}, loadItems, onLoadError }) => {
  const [items, setItems] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, goToPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE_BUTTONS[0]);

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
    [filters, loadItems, onLoadError, page, perPage, setItems, setTotalCount]
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
