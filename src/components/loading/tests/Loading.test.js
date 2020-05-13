import React from 'react';
import { Loading, LoadingSVG, LoadingLogoSVG } from '../Loading';
import { render, shallow } from 'enzyme';

jest.mock('src/hooks/useHibanaOverride', () => styles => styles);

describe('Loading Component', () => {
  it('should have data-id tag', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.find({ 'data-id': 'loading' })).toExist();
  });

  describe('Circle', () => {
    it('should render - no props', () => {
      const wrapper = render(<LoadingSVG />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a specific size (small)', () => {
      const wrapper = render(<LoadingSVG size="Small" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a specific style (center)', () => {
      const wrapper = render(<LoadingSVG className="Center" />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Logo', () => {
    it('should render - no props', () => {
      const wrapper = render(<LoadingLogoSVG />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
