import React from 'react';
import { shallow } from 'enzyme';
import { renderCell, HeaderRow, GroupHeading, Row } from '../FeatureComparisonModal';
import { PLANS } from '../../constants';
describe('FeatureComparisonModal: ', () => {
  const props = {
    open: true,
    plans: PLANS,
    handleClose: jest.fn((x) => true),
    onClose: jest.fn((x) => true),
    showCloseButton: true,
    groupName: 'Standard Features',
    colSpan: 3,
    featureName: 'Signals Predictive Analytics',
    testAccount: true,
    starterPlans: true,
    premierPlans: true
  };
  describe('Row: ', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<Row {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('GroupHeading: ', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<GroupHeading {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('HeaderRow:', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<HeaderRow {...props}/>);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('renderCell: ', () => {
    it('should render a icon when value passed is boolean', () => {
      const wrapper = shallow(renderCell(true));
      expect(wrapper).toContainExactlyOneMatchingElement('IconBase');
    });
    it('should render a node when value is a string containing \n', () => {
      const wrapper = shallow(renderCell('test string \n'));
      expect(wrapper).toContainMatchingElements('div');
    });
  });
});
