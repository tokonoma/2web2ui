import cases from 'jest-in-case';
import templatesReducer, { initialState } from '../templates';

const TEST_CASES = {
  'stores draft': {
    payload: { id: 'test-draft', content: { from: 'me@domain.com', subject: 'draft template', html: 'html content' }},
    type: 'GET_DRAFT_TEMPLATE_SUCCESS'
  },
  'stores draft with obj from': {
    payload: { id: 'test-draft', content: { from: { name: 'sender 1', email: 'sender1@domain.com' }, subject: 'draft template', html: 'html content' }},
    type: 'GET_DRAFT_TEMPLATE_SUCCESS'
  },
  'stores published': {
    payload: { id: 'test-published', content: { from: 'me@domain.com' , subject: 'published template', html: 'html content' }},
    type: 'GET_PUBLISHED_TEMPLATE_SUCCESS'
  },
  'stores published with obj from': {
    payload: { id: 'test-published', content: { from: { name: 'sender 2', email: 'sender2@domain.com' }, subject: 'published template', html: 'html content' }},
    type: 'GET_PUBLISHED_TEMPLATE_SUCCESS'
  },
  'stores preview of draft with string from': {
    meta: {
      context: {
        id: 'test-template',
        mode: 'draft'
      }
    },
    payload: {
      subject: 'Preview of Test Template',
      html: '<h1>Preview of Test Template</h1>',
      from: 'me@domain.com'
    },
    type: 'GET_TEMPLATE_PREVIEW_SUCCESS'
  },
  'stores preview of draft with obj from': {
    meta: {
      context: {
        id: 'test-template',
        mode: 'draft'
      }
    },
    payload: {
      subject: 'Preview of Test Template',
      html: '<h1>Preview of Test Template</h1>',
      from: { name: 'unnamed', email: 'me@domain.com' }
    },
    type: 'GET_TEMPLATE_PREVIEW_SUCCESS'
  },
  'stores preview error': {
    type: 'GET_TEMPLATE_PREVIEW_FAIL',
    payload: new Error('Oh no!')
  },
  'updates updating state when update fails': {
    type: 'UPDATE_TEMPLATE_FAIL'
  },
  'updates updating state when update pending': {
    type: 'UPDATE_TEMPLATE_PENDING'
  },
  'stores updated draft': {
    now: {
      toISOString: () => '2019-05-16T02:03:33.254Z'
    },
    type: 'UPDATE_TEMPLATE_SUCCESS',
    meta: {
      context: {
        id: 'test-template'
      },
      data: {
        content: {
          subject: 'Test Template',
          html: '<h1>Updated Test Template</h1>',
          from: {
            name: '',
            email: 'test@example.com'
          }
        }
      }
    },
    state: {
      ...initialState,
      byId: {
        'test-template': {
          draft: {
            content: {
              html: '<h1>Test Template</h1>'
            },
            last_update_time: '2019-05-16T02:00:06.928Z'
          }
        }
      }
    }
  }
};

cases('Template reducer', ({ state, ...action }) => {
  expect(templatesReducer(state, action)).toMatchSnapshot();
}, TEST_CASES);

describe('template publishing', () => {
  const testCases = {
    'publishes template pending': {
      type: 'PUBLISH_ACTION_PENDING',
      match: { publishPending: true }
    },
    'publishes template success': {
      type: 'PUBLISH_ACTION_SUCCESS',
      match: { publishPending: false }
    },
    'publishes template fail': {
      type: 'PUBLISH_ACTION_FAIL',
      match: { publishPending: false }
    }
  };

  cases('Template reducer', ({ state, match, ...action }) => {
    expect(templatesReducer({}, action)).toEqual(match); //passing empty state to assert just return value
  }, testCases);

});
