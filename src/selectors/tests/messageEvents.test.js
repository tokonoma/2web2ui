import * as selectors from '../messageEvents';

describe('MessageEvents Selectors', () => {
  let props;
  let messageEvents;
  let messageEventsCSV;
  let messageHistory;
  let selectedEvent;
  let formattedEvents;

  beforeEach(() => {
    props = {
      match: {
        params: {
          messageId: 'message_id',
          eventId: 'selected_id'
        }
      }
    };

    const events = [
      {
        event_id: 'default_id',
        foo: 'bar',
        timestamp: '2017-11-09T00:00'
      },
      {
        bat: 'baz',
        foo: 'bar',
        timestamp: '2017-11-08T11:00'
      }
    ];

    formattedEvents = [
      { ...events[0],
        formattedDate: 'Nov 9 2017, 12:00am' },
      { ...events[1],
        formattedDate: 'Nov 8 2017, 11:00am' }
    ];

    messageEvents = { events: events };
    messageEventsCSV = { eventsCSV: events };
    messageHistory = { history: { message_id: events }};
    selectedEvent = [
      {
        event_id: 'selected_id',
        foo: 'bar',
        timestamp: '2017-11-09T00:00'
      }
    ];
  });


  describe('Selectors: Message Events', () => {
    it('returns formatted message event data', () => {
      expect(selectors.selectMessageEvents({ messageEvents })).toMatchSnapshot();
    });
  });

  describe('Selectors: Message Events CSV', () => {
    it('returns formatted message events CSV data', () => {
      expect(selectors.selectMessageEventsCSV({ messageEvents: messageEventsCSV })).toMatchSnapshot();
    });
  });

  describe('Selectors: Message History', () => {
    it('returns formatted message history data', () => {
      expect(selectors.selectMessageHistory({ messageEvents: messageHistory }, props)).toMatchSnapshot();
    });
  });

  describe('Selectors: Initial Event Id', () => {
    it('returns event_id', () => {
      expect(selectors.selectInitialEventId({ messageEvents: messageHistory }, props)).toEqual(props.match.params.eventId);
    });

    it('returns default event_id', () => {
      props.match.params.eventId = null;
      expect(selectors.selectInitialEventId({ messageEvents: messageHistory }, props)).toEqual(formattedEvents[0].event_id);
    });
  });

  describe('selectMessageEventsSearchOptions', () => {
    const state = {
      messageEvents: {
        search: {
          dateOptions: {
            from: '2018-03-23T17:10:08-04:00',
            to: '2018-03-23T17:11:08-04:00',
            relativeRange: 'hour'
          }
        }
      }
    };

    it('prepares message events reportOptions for URL sharing', () => {
      expect(selectors.selectMessageEventsSearchOptions(state)).toMatchSnapshot();
    });
  });

  describe('isMessageHistoryEmpty', () => {
    it('should return true when messageId is not in history', () => {
      const state = {
        messageEvents: {
          history: {
            abc: []
          }
        }
      };
      const props = { match: { params: { messageId: 'abc' }}};

      expect(selectors.isMessageHistoryEmpty(state, props)).toEqual(true);
    });

    it('should return false when messageId is in history', () => {
      const state = {
        messageEvents: {
          history: {
            abc: [
              { event_id: '123', message_id: 'abc' },
              { event_id: '234', message_id: 'abc' }
            ]
          }
        }
      };
      const props = { match: { params: { messageId: 'abc' }}};

      expect(selectors.isMessageHistoryEmpty(state, props)).toEqual(false);
    });

    it('should return true when history is empty', () => {
      const state = {
        messageEvents: {
          history: {}
        }
      };
      const props = { match: { params: { messageId: 'abc' }}};

      expect(selectors.isMessageHistoryEmpty(state, props)).toEqual(true);
    });
  });

  describe('getSelectedEventFromMessageHistory', () => {
    it('returns correct event from messageHistory', () => {
      props.match.params.eventId = 'default_id';
      expect(selectors.getSelectedEventFromMessageHistory({ messageEvents: messageHistory }, props)).toEqual(formattedEvents[0]);
    });

    it('returns undefined if event does not exist in messageHistory', () => {
      expect(selectors.getSelectedEventFromMessageHistory({ messageEvents: messageHistory }, props)).toBe(undefined);
    });
  });

  describe('getMessageIdParam', () => {
    it('returns correct messageId value from path', () => {
      expect(selectors.getMessageIdParam({}, { match: { params: { messageId: 'xyz' }}})).toEqual('xyz');
    });

    it('returns undefined when messageId is absent', () => {
      expect(selectors.getMessageIdParam({}, { match: { params: {}}})).toBe(undefined);
    });
  });

  describe('eventPageMSTP', () => {
    let store;
    let props;
    beforeEach(() => {
      store = { messageEvents: { ...messageHistory, selectedEvent, documentation: {}}};
      props = { match: { params: { messageId: 'message_id', eventId: 'default_id' }}};
    });

    it('returns correct props for event with message_id', () => {
      expect(selectors.eventPageMSTP()(store, props)).toMatchSnapshot();
    });

    it('returns correct props for orphan event (w/o message_id)', () => {
      props.match.params.messageId = '_noid_';
      expect(selectors.eventPageMSTP()(store, props)).toMatchSnapshot();
    });

  });
});
