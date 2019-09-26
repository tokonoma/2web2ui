import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { RouterContextProvider } from 'src/context/RouterContext';

import IntegrationPage from '../IntegrationPage';

jest.mock('src/actions/ingestBatchEvents');

describe('IntegrationPage', () => {
  const App = ({ requestParams = 'statuses=system', children }) => <MemoryRouter initialEntries={[`/?${requestParams}`]}>
    <RouterContextProvider>
      {children}
    </RouterContextProvider>
  </MemoryRouter>;

  const renderPage = (props) => {
    const baseProps = {
      loadingStatus: 'success',
      eventsByPage: [],
      getIngestBatchEvents: jest.fn(),
      nextCursor: jest.fn(),
      totalCount: undefined
    };
    return <IntegrationPage {...baseProps} {...props} />;
  };

  const subject = ({ props = {}, requestParams = '' } = {}) => mount(
    <App requestParams={requestParams} updateRoute={jest.fn()}>{renderPage(props)}</App>
  ).find('IntegrationPage');


  it('renders a page', () => {
    expect(subject().find('Page')).toExist();
  });

  it('renders loading component', () => {
    expect(subject({ props: { loadingStatus: 'pending' }}).find('svg')).toExist();
  });

  it('renders error', () => {
    const wrapper = subject({ props: { loadingStatus: 'fail' }});
    expect(wrapper.find('Panel').at(1).prop('title')).toEqual('Something went wrong');
  });

  it('passes the batch status and perPage params correctly', () => {
    const wrapper = subject({ requestParams: 'batchStatus=system&batchStatus=validation&perPage=10' });
    expect(wrapper.find('IntegrationPageFilter').prop('initialValues')).toEqual({ batchStatus: 'system', batchIds: []});
    expect(wrapper.find('PerPageButtons').prop('perPage')).toEqual(10);
  });

  it('passes the batch id params correctly', () => {
    const wrapper = subject({ requestParams: 'batchIds=ABCDEF' });
    expect(wrapper.find('IntegrationPageFilter').prop('initialValues')).toEqual({ batchStatus: '', batchIds: ['ABCDEF']});
  });

});
