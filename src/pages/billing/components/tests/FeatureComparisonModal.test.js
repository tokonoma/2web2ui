import React from 'react';
import { shallow } from 'enzyme';
import ComparisonModal, { renderCell, HeaderRow, GroupHeading, Row } from '../FeatureComparisonModal';
import { PLANS } from '../../constants';
describe('FeatureComparisonModal: ', () => {
  describe('ComparisonModal: ', () => {
    const props = {
      open: true,
      handleClose: jest.fn()
    };
    it('should render correctly', () => {
      const wrapper = shallow(<ComparisonModal {...props}/>);
      expect(wrapper).toMatchSnapshot();
    });

  });
  describe('Row: ', () => {
    const props = {
      featureName: 'Signals Predictive Analytics',
      featuerValues: {
        testAccount: true,
        starterPlans: true,
        premierPlans: true
      }
    };
    it('should render correctly', () => {
      const wrapper = shallow(<Row featureName = {props.featureName} {...props.featuerValues} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('GroupHeading: ', () => {
    const props = {
      groupName: 'Standard Features',
      colSpan: PLANS.length
    };
    it('should render correctly', () => {
      const wrapper = shallow(<GroupHeading {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('HeaderRow:', () => {
    const props = {
      plans: PLANS
    };
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
      expect(wrapper).toContainMatchingElements(3, 'div');
    });
  });
});
