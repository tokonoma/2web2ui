import { createMockStore } from 'src/__testHelpers__/mockStore';
import localforage from 'localforage';
import * as templates from '../templates';
import * as templatesHelpers from '../helpers/templates';

import cases from 'jest-in-case';

import _ from 'lodash';

jest.mock('../helpers/sparkpostApiRequest', () => jest.fn((a) => a));

describe('Action Creator: Templates', () => {
  let mockStore;
  let dispatchMock;

  const user = {
    currentUser: {
      username: 'user'
    }
  };

  beforeEach(async () => {
    localforage.setItem = jest.fn((a) => Promise.resolve(a));
    localforage.getItem = jest.fn(() => Promise.resolve(null));
    templatesHelpers.getTestDataKey = jest.fn(() => 'key');
    dispatchMock = jest.fn((a) => Promise.resolve(a));
    mockStore = createMockStore(user);
  });

  it('should dispatch a list action', () => {
    mockStore.dispatch(templates.listTemplates());
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch a get draft action', () => {
    mockStore.dispatch(templates.getDraft('one'));
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch a get published action', () => {
    mockStore.dispatch(templates.getPublished('two'));
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch a delete action', () => {
    mockStore.dispatch(templates.deleteTemplate('three'));
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch a create action', () => {
    const data = {
      id: 'id',
      testData: { test: 'data' },
      form: 'data'
    };
    mockStore.dispatch(templates.create(data));
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch an update action', async () => {
    const data = {
      id: 'id',
      testData: { test: 'data' },
      form: 'data'
    };
    const thunk = templates.update(data);
    await thunk(dispatchMock);
    expect(_.flatten(dispatchMock.mock.calls)).toMatchSnapshot();
  });

  it('should dispatch a publish action', async () => {
    const data = {
      id: 'id',
      testData: { test: 'data' },
      form: 'data'
    };
    const thunk = templates.publish(data);
    await thunk(dispatchMock);
    expect(_.flatten(dispatchMock.mock.calls)).toMatchSnapshot();
  });

  it('should dispatch a setTestData action', async () => {
    const data = {
      id: 'id',
      data: { test: 'data' },
      mode: 'draft'
    };
    await mockStore.dispatch(templates.setTestData(data));
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch a getTestData action', async () => {
    localforage.getItem = jest.fn(() => Promise.resolve('{ "test": "test" }'));
    const data = { id: 'id', mode: 'draft' };
    await mockStore.dispatch(templates.getTestData(data));
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  describe('getTestData', () => {
    it('should handle old test data', async () => {
      localforage.getItem = jest.fn(() => Promise.resolve('{"test": "test"}'));
      const template = { id: 'id', mode: 'draft' };
      await mockStore.dispatch(templates.getTestData(template));
      expect(mockStore.getActions()).toMatchSnapshot();
    });

    cases('should handle partial test data', async (testRecord) => {
      localforage.getItem = jest.fn(() => Promise.resolve(JSON.stringify(testRecord.payload)));
      const template = { id: 'id', mode: 'draft' };
      await mockStore.dispatch(templates.getTestData(template));
      expect(mockStore.getActions()).toMatchSnapshot();
    }, [
      { name: 'substitution_data only', payload: { substitution_data: { test: 'test' }}},
      { name: 'metadata only', payload: { metadata: { flavour: 'vanilla' }}},
      { name: 'options only', payload: { options: { sandbox: true }}},
      { name: 'combo', payload: { substitution_data: { test: 'test' }, options: { sandbox: true }}}
    ]);
  });

  it('should dispatch getDraft, getTestData, and getPreview actions', async () => {
    const action = templates.getDraftAndPreview('test-template');
    await mockStore.dispatch(action);
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch getPublished, getTestData, and getPreview actions', async () => {
    const action = templates.getPublishedAndPreview('test-template');
    await mockStore.dispatch(action);
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch a getPreview action', async () => {
    const action = templates.getPreview({
      content: {
        html: '<h1>Test Draft</h1>',
        subject: 'Test Draft'
      },
      id: 'test-template',
      mode: 'draft'
    });
    await mockStore.dispatch(action);
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  it('should dispatch getTestData and sendPreview actions', async () => {
    const action = templates.sendPreview({
      emails: ['test@example.com'],
      from: 'test@sparkpostbox.com',
      id: 'test-template',
      mode: 'draft'
    });
    await mockStore.dispatch(action);
    expect(mockStore.getActions()).toMatchSnapshot();
  });

  describe('createV2', () => {
    it('dispatches create template with passed in data', async () => {
      const action = templates.createV2({
        id: 'my-id',
        assignTo: 'shared',
        subaccount: 123,
        content: {
          html: '<p>Hello world</p>'
        },
        testData: {
          substitution_data: {},
          options: {},
          metadata: {}
        }
      });

      await mockStore.dispatch(action);
      expect(mockStore.getActions()).toMatchSnapshot();
    });
  });

  describe('updateV2', () => {
    it('dispatches update template with passed in data', async () => {
      const action = templates.updateV2({
        id: 'my-new-id',
        content: {
          html: '<p>My new content.</p>'
        },
        testData: {
          options: {},
          substitution_data: {
            foo: 'bar'
          }
        }
      });

      await mockStore.dispatch(action);
      expect(mockStore.getActions()).toMatchSnapshot();
    });
  });

  describe('publishV2', () => {
    it('dispatches the publish action with passed in data', async () => {
      const data = {
        id: 'foo',
        testData: {
          options: {},
          substitution_data: {
            hello: 'world'
          },
          metadata: {}
        }
      };
      const action = templates.publishV2(data, 123);

      await mockStore.dispatch(action);
      expect(mockStore.getActions()).toMatchSnapshot();
    });
  });

  describe('deleteTemplateV2', () => {
    it('dispatches delete template with the passed in ID and subaccount', async () => {
      const action = templates.deleteTemplateV2('foo', 123);

      await mockStore.dispatch(action);
      expect(mockStore.getActions()).toMatchSnapshot();
    });
  });

  describe('setTestDataV2', () => {
    it('updates local storage with passed in data by invoking localStorage.setItem', async () => {
      const data = {
        options: {},
        substitution_data: {
          foo: 'bar'
        },
        metadata: {}
      };

      await mockStore.dispatch(templates.setTestDataV2({
        data,
        id: 'foo',
        mode: 'draft'
      }));

      expect(window.localStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify(data));
    });
  });

  describe('deleteTestDataV2', () => {
    it('removes an item from local storage based on the passed in ID', async () => {
      await mockStore.dispatch(templates.deleteTestDataV2({ id: 'foo' }));

      expect(window.localStorage.removeItem).toHaveBeenCalledWith('key');
    });
  });

  describe('getTestDataV2', () => {
    it('retrieves an item from local storage by invoking localStorage.getItem', async () => {
      await mockStore.dispatch(templates.getTestDataV2({ id: 'foo', mode: 'draft' }));

      expect(window.localStorage.getItem).toHaveBeenCalledWith('key');
    });
  });
});

