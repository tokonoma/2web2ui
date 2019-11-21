import { mount } from 'enzyme';
import React from 'react';
import Tooltip from '../Tooltip';
import * as geometry from 'src/helpers/geometry';

jest.mock('src/helpers/geometry');

describe('Signals Tooltip Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      coordinate: { x: 0, y: 0 },
      payload: [{
        value: 1,
        payload: {
          value: 1,
          date: new Date('2010-01-01T12:00:00.000Z')
        }
      }]
    };
    geometry.getBoundingClientRect.mockImplementation(() => ({ left: 0, width: 0, height: 0 }));
    wrapper = mount(<Tooltip {...props}/>);
  });

  it('renders correctly with default children', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly without date', () => {
    wrapper.setProps({ payload: [{ payload: { value: 1 }}]});
    expect(wrapper).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    wrapper.setProps({ children: () => 'test' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with a custom width correctly', () => {
    wrapper.setProps({ width: '1200px' });
    expect(wrapper).toMatchSnapshot();
  });

  describe('positioning', () => {
    let setRect;

    beforeEach(() => {
      setRect = (options) => {
        geometry.getBoundingClientRect.mockImplementation(() => options);
      };
      global.innerWidth = 1000;
    });

    it('should calculate position when x coordinates change', () => {
      setRect({ left: 100, width: 200, height: 100 });
      wrapper.setProps({ coordinate: { x: 100, y: 0 }});
      wrapper.update();

      expect(wrapper.find('.TooltipWrapper').prop('style')).toEqual({
        left: 125, // Equal to coordinate.x + offset
        top: -50,
        width: '200px'
      });
    });

    it('should calculate position when y coordinates change and tooltip overflows past right edge of viewport', () => {
      setRect({ left: 900, width: 200, height: 100 });
      wrapper.setProps({ coordinate: { x: 0, y: 100 }});
      wrapper.update();

      expect(wrapper.find('.TooltipWrapper').prop('style')).toEqual({
        left: -225, // Equal to coordinate.x - width - offset
        top: 50,
        width: '200px'
      });
    });
  });
});
