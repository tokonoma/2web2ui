import React from 'react';
import { shallow } from 'enzyme';
import RecipientValidationPriceModal from '../RecipientValidationPriceModal';

describe('RecipientValidationModal', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RecipientValidationPriceModal />);
    expect(wrapper).toMatchSnapshot();
  });
});
