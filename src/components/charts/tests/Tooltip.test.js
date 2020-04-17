import { mount } from 'enzyme';
import React from 'react';
import Tooltip from '../Tooltip';
import * as geometry from 'src/helpers/geometry';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import styles from './TooltipHibana.module.scss';

jest.mock('src/hooks/useHibanaOverride');
jest.mock('src/helpers/geometry');

describe('Signals Tooltip Component', () => {
  let defaultProps = {
    coordinate: { x: 0, y: 0 },
    width: '200px',
    offset: 25,
    payload: [
      {
        value: 1,
        payload: {
          value: 1,
          date: new Date('2010-01-01T12:00:00.000Z'),
        },
      },
    ],
  };
  beforeEach(() => {
    geometry.getBoundingClientRect.mockImplementation(() => ({ left: 0, width: 0, height: 0 }));
    useHibanaOverride.mockReturnValue(styles);
  });

  const subject = props => mount(<Tooltip {...defaultProps} {...props} />);

  it('renders correctly with default children', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders correctly without date', () => {
    const wrapper = subject({ payload: [{ payload: { value: 1 } }] });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    const wrapper = subject({ children: () => 'test' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with a custom width correctly', () => {
    const wrapper = subject({ width: '1200px' });
    expect(wrapper).toMatchSnapshot();
  });

  describe('positioning', () => {
    let setRect;

    beforeEach(() => {
      setRect = options => {
        geometry.getBoundingClientRect.mockImplementation(() => options);
      };
      global.innerWidth = 1000;
    });

    it('should calculate position when x coordinates change', () => {
      setRect({ left: 100, width: 200, height: 100 });
      const wrapper = subject({ coordinate: { x: 100, y: 0 } });
      wrapper.update();
      expect(wrapper.find('.TooltipWrapper').prop('style')).toEqual({
        left: 125, // Equal to coordinate.x + offset
        top: -50,
        width: '200px',
      });
    });

    it('should calculate position when y coordinates change and tooltip overflows past right edge of viewport', () => {
      setRect({ left: 900, width: 200, height: 100 });
      const wrapper = subject({ coordinate: { x: 0, y: 100 } });
      wrapper.update();

      expect(wrapper.find('.TooltipWrapper').prop('style')).toEqual({
        left: -225, // Equal to coordinate.x - width - offset
        top: 50,
        width: '200px',
      });
    });
  });
});
