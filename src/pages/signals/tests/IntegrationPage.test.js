import React from 'react';
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

  // it('renders loading component', () => {
  //   expect(subject({ props: { loadingStatus: 'pending' }}).find('svg')).toExist();
  // });
  //
  // it('renders error', () => {
  //   const wrapper = subject({ props: { loadingStatus: 'fail' }});
  //   expect(wrapper.find('Panel').at(1).prop('title')).toEqual('Something went wrong');
  // });
  //
  // it('passes the batch status and perPage params correctly', () => {
  //   const wrapper = subject({ requestParams: 'batchStatus=system&batchStatus=validation&perPage=10' });
  //   expect(wrapper.find('IntegrationPageFilter').prop('initialValues')).toEqual({ batchStatus: 'system', batchIds: []});
  //   expect(wrapper.find('PerPageButtons').prop('perPage')).toEqual(10);
  // });
  //
  // it('passes the batch id params correctly', () => {
  //   const wrapper = subject({ requestParams: 'batchIds=ABCDEF' });
  //   expect(wrapper.find('IntegrationPageFilter').prop('initialValues')).toEqual({ batchStatus: '', batchIds: ['ABCDEF']});
  // });

});
