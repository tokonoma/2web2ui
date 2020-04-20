import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import Head from '../Head';

jest.mock('src/context/HibanaContext');

describe('Head', () => {
  it('renders a row of header cells', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const handleSort = jest.fn();
    const wrapper = shallow(
      <Head
        columns={[
          {
            dataKey: 'id',
            label: 'Identifier',
            sortable: true,
          },
          {
            dataKey: 'value',
            label: 'Value',
            sortable: false,
            width: '90%',
          },
        ]}
        onSort={handleSort}
        order={{ ascending: true, dataKey: 'id' }}
      />,
    );

    // TODO: `.dive()` no longer needed when OG theme removed
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
