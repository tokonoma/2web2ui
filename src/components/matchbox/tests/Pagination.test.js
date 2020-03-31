import React from 'react';
import Pagination from '../Pagination';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');

describe('Pagination', () => {
  const defaultProps = {
    pages: 1,
    pageRange: 1,
  };

  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = shallow(<Pagination {...defaultProps} />);
    expect(wrapper).toHaveDisplayName('HibanaPagination');
  });

  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = shallow(<Pagination {...defaultProps} />);
    expect(wrapper).toHaveDisplayName('OGPagination');
  });
});
