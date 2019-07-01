import React from 'react';
import { shallow } from 'enzyme';
import RecipientValidationPriceTable from '../RecipientValidationPriceTable';

describe('RecipientValidationTable', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RecipientValidationPriceTable />);
    expect(wrapper).toMatchSnapshot();
  });
});
