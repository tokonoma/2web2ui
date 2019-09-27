import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useRouter from 'src/hooks/useRouter';
import IntegrationPage from '../IntegrationPage';

jest.mock('src/hooks/useRouter');

describe('IntegrationPage', () => {
  const subject = ({ routerState = {}, ...props } = {}) => {
    useRouter.mockReturnValue({
      requestParams: {},
      updateRoute: () => {},
      ...routerState
    });

    return mount(
      <IntegrationPage
        getIngestBatchEvents={() => {}}
        eventsByPage={[]}
        loadingStatus="success"
        totalCount={0}
        {...props}
      />
    );
  };

  it('disables filters when pending', () => {
    const wrapper = subject({ loadingStatus: 'pending' });
    expect(wrapper.find('IntegrationPageFilter')).toHaveProp('disabled', true);
  });

  it('hydrates filters with batch id', () => {
    const wrapper = subject({
      routerState: {
        requestParams: {
          batchIds: '8c4b19fb-07a2-42cb-84f7-3ab09a8049e0'
        }
      }
    });

    expect(wrapper.find('IntegrationPageFilter')).toHaveProp('initialValues', {
      batchIds: ['8c4b19fb-07a2-42cb-84f7-3ab09a8049e0'],
      batchStatus: ''
    });
  });

  it('hydrates filters with batch ids', () => {
    const wrapper = subject({
      routerState: {
        requestParams: {
          batchIds: [
            '8c4b19fb-07a2-42cb-84f7-3ab09a8049e0',
            '8c4b19fb-07a2-42cb-84f7-3ab09a8049e1'
          ]
        }
      }
    });

    expect(wrapper.find('IntegrationPageFilter')).toHaveProp('initialValues', {
      batchIds: [
        '8c4b19fb-07a2-42cb-84f7-3ab09a8049e0',
        '8c4b19fb-07a2-42cb-84f7-3ab09a8049e1'
      ],
      batchStatus: ''
    });
  });

  it('hydrates filters with batch status', () => {
    const wrapper = subject({
      routerState: {
        requestParams: {
          batchStatus: 'success'
        }
      }
    });

    expect(wrapper.find('IntegrationPageFilter')).toHaveProp('initialValues', {
      batchIds: [],
      batchStatus: 'success'
    });
  });

  it('hydrates filters with first batch status', () => {
    const wrapper = subject({
      routerState: {
        requestParams: {
          batchStatus: [
            'validation',
            'success'
          ]
        }
      }
    });

    expect(wrapper.find('IntegrationPageFilter')).toHaveProp('initialValues', {
      batchIds: [],
      batchStatus: 'validation'
    });
  });

  it('updates query string params when filters change', () => {
    const updateRoute = jest.fn();
    const wrapper = subject({ routerState: { updateRoute }});
    const nextFilters = {
      batchIds: ['8c4b19fb-07a2-42cb-84f7-3ab09a8049e0'],
      batchStatus: 'success'
    };

    act(() => {
      wrapper.find('IntegrationPageFilter').prop('onChange')(nextFilters);
    });

    wrapper.update();

    expect(updateRoute).toHaveBeenCalledWith({ ...nextFilters, perPage: 10 });
  });

  it('updates query string params when per page changes', () => {
    const updateRoute = jest.fn();
    const wrapper = subject({ routerState: { updateRoute }});

    act(() => {
      wrapper.find('PerPageButtons').prop('onPerPageChange')(25);
    });

    wrapper.update();

    expect(updateRoute).toHaveBeenCalledWith({
      batchIds: undefined,
      batchStatus: undefined,
      perPage: 25
    });
  });

  it('disables next button when no more data is available', () => {
    const wrapper = subject({ totalCount: 9 }); // assuming perPage default is 10
    expect(wrapper.find('CursorPaging')).toHaveProp({
      currentPage: 1,
      nextDisabled: true
    });
  });

  it('enables next button when more data is available', () => {
    const wrapper = subject({ totalCount: 11 }); // assuming perPage default is 10
    expect(wrapper.find('CursorPaging')).toHaveProp({
      currentPage: 1,
      nextDisabled: false
    });
  });

  it('disables previous button when on first page', () => {
    const wrapper = subject();
    expect(wrapper.find('CursorPaging')).toHaveProp({
      currentPage: 1,
      previousDisabled: true
    });
  });

  it('requests data when page filters initialize', () => {
    const getIngestBatchEvents = jest.fn();
    const wrapper = subject({ getIngestBatchEvents });
    const nextFilters = { batchIds: [], batchStatus: 'success' };

    act(() => {
      wrapper.find('IntegrationPageFilter').prop('onInit')(nextFilters);
    });

    wrapper.update();

    expect(wrapper.find('IntegrationPageFilter')).toHaveProp('initialValues', nextFilters);
    expect(wrapper.find('CursorPaging')).toHaveProp('currentPage', 1);
    expect(getIngestBatchEvents).toHaveBeenCalledWith({
      batchIds: [],
      cursor: undefined,
      perPage: 10,
      statuses: ['success']
    });
  });

  it('requests data with same params when retried', () => {
    const getIngestBatchEvents = jest.fn();
    const wrapper = subject({ getIngestBatchEvents });
    const nextFilters = { batchIds: [], batchStatus: '' };

    act(() => {
      wrapper.find('IntegrationCollection').prop('onRetry')(nextFilters);
    });

    wrapper.update();

    expect(getIngestBatchEvents).toHaveBeenCalledWith({
      batchIds: [],
      cursor: undefined,
      perPage: 10,
      statuses: undefined
    });
  });

  it('changes page and requests data when cursor paging buttons are clicked', () => {
    const getIngestBatchEvents = jest.fn();
    const wrapper = subject({ getIngestBatchEvents, nextCursor: 'ABCDEFC' });

    act(() => {
      wrapper.find('CursorPaging').prop('handlePageChange')(2);
    });

    wrapper.update();

    expect(wrapper.find('CursorPaging')).toHaveProp('currentPage', 2);
    expect(getIngestBatchEvents).toHaveBeenCalledWith({
      batchIds: [],
      cursor: 'ABCDEFC',
      perPage: 10,
      statuses: undefined
    });
  });

  it('changes page and does not request data when already cached', () => {
    const getIngestBatchEvents = jest.fn();
    const wrapper = subject({
      eventsByPage: [[]], // not real, but simulates cached data for first page
      getIngestBatchEvents,
      nextCursor: 'ABCDEFC'
    });

    act(() => {
      wrapper.find('CursorPaging').prop('handlePageChange')(1);
    });

    wrapper.update();

    expect(wrapper.find('CursorPaging')).toHaveProp('currentPage', 1);
    expect(getIngestBatchEvents).toHaveBeenCalledTimes(1); // only once on init
  });

  it('changes page when first page button is clicked', () => {
    const wrapper = subject();

    act(() => {
      wrapper.find('CursorPaging').prop('handleFirstPage')();
    });

    wrapper.update();

    expect(wrapper.find('CursorPaging')).toHaveProp('currentPage', 1);
  });

  it('resets page and requests data when page size changes', () => {
    const getIngestBatchEvents = jest.fn();
    const wrapper = subject({ getIngestBatchEvents });

    act(() => {
      wrapper.find('PerPageButtons').prop('onPerPageChange')(25);
    });

    wrapper.update();

    expect(wrapper.find('PerPageButtons')).toHaveProp('perPage', 25);
    expect(getIngestBatchEvents).toHaveBeenCalledWith({
      batchIds: [],
      cursor: undefined,
      perPage: 25,
      statuses: undefined
    });
  });
});
