import React from 'react';
import { AddFilterLink } from '../AddFilterLink';
import { shallow } from 'enzyme';

describe('Add Filter Link', () => {

  const filters = ['Campaign: shiny new filter'];
  const baseProps = {
    newFilter: { id: 0, type: 'Subaccount', value: 'Master Account (ID 0)' },
    reportType: 'summary',
    content: 'master account',
    addFilters: jest.fn(),
    reportSearchOptions: {
      filters
    },
    summarySearchOptions: {
      filters,
      metrics: ['count_something']
    }
  };

  function subject(props) {
    return shallow(<AddFilterLink {...baseProps} {...props} />);
  }

  it('should render correctly for the summary report and include metrics in the link', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly for other reports and should not include metrics in the link', () => {
    const wrapper = subject({ reportType: 'bounce' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle click correctly', () => {
    const wrapper = subject();
    const preventDefaultMock = jest.fn();
    wrapper.find('UnstyledLink').simulate('click', { preventDefault: preventDefaultMock });

    expect(baseProps.addFilters).toHaveBeenCalledWith([{ id: 0, type: 'Subaccount', value: 'Master Account (ID 0)' }]);
    expect(preventDefaultMock).toHaveBeenCalled();
  });
});
