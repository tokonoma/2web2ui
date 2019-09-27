import qs from 'qs';

const initialState = {
  eventsByPage: [
    // [ page 1 ],
    // page 2,
    // page 3
  ],
  loadingStatus: 'init',
  // nextCursor
  totalCount: 0
};

const ingestBatchEventsReducer = (state = initialState, { type, payload, extra, meta }) => {
  switch (type) {
    case 'GET_INGEST_BATCH_EVENTS_PENDING': {
      if (!meta.params.cursor) { // request for first page
        return {
          ...state,
          loadingStatus: 'pending',
          eventsByPage: [],
          nextCursor: undefined
        };
      }

      return {
        ...state,
        loadingStatus: 'pending'
      };
    }

    case 'GET_INGEST_BATCH_EVENTS_FAIL':
      return { ...state, loadingStatus: 'fail' };

    case 'GET_INGEST_BATCH_EVENTS_SUCCESS': {
      const [_path, query] = (extra.links.next || '').split('?');
      return {
        ...state,
        loadingStatus: 'success',
        eventsByPage: [
          ...state.eventsByPage,
          payload
        ],
        nextCursor: query
          ? qs.parse(query).cursor
          : undefined, // unset on last page
        totalCount: extra.total_count ? extra.total_count : 0
      };
    }
  }

  return state;
};
export default ingestBatchEventsReducer;
