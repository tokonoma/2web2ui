import React from 'react';
import Panel from '../Panel';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Panel Matchbox component wrapper: ', () => {
  const subject = (Component, props) => {
    return shallow(<Component {...props}>Children...</Component>);
  };

  const checkHibana = ({ wrapper, componentName, props }) => {
    expect(wrapper.find(`Hibana${componentName}`)).toExist();
    expect(wrapper.find(`OG${componentName}`)).not.toExist();

    Object.keys(props).forEach(key => {
      expect(wrapper.find(`Hibana${componentName}`)).toHaveProp(key, props[key]);
    });
    expect(wrapper).toHaveTextContent('Children...');
  };

  const checkOG = ({ wrapper, componentName, pickedProps, omittedProps }) => {
    expect(wrapper.find(`Hibana${componentName}`)).not.toExist();
    expect(wrapper.find(`OG${componentName}`)).toExist();

    Object.keys(pickedProps).forEach(key => {
      expect(wrapper.find(`OG${componentName}`)).toHaveProp(key, pickedProps[key]);
    });
    Object.keys(omittedProps).forEach(key => {
      expect(wrapper.find(`OG${componentName}`)).not.toHaveProp(key, omittedProps[key]);
    });
    expect(wrapper).toHaveTextContent('Children...');
  };

  describe('Standalone Panel', () => {
    const defaultProps = {
      accent: true,
    };
    const systemProps = {
      my: '100',
    };
    const mergedProps = { ...systemProps, ...defaultProps };

    it('renders the Hibana Panel component correctly when hibana is enabled', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

      const wrapper = subject(Panel, mergedProps);
      checkHibana({ wrapper, componentName: 'Panel', props: mergedProps });
    });

    it('renders the OG Panel component correctly when hibana is not enabled', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

      const wrapper = subject(Panel, mergedProps);
      checkOG({
        wrapper,
        componentName: 'Panel',
        pickedProps: defaultProps,
        omittedProps: systemProps,
      });
    });
  });

  describe('Panel Section', () => {
    const defaultProps = {};

    const systemProps = {
      my: '100',
    };
    const mergedProps = { ...systemProps, ...defaultProps };

    it('renders the Hibana Panel component correctly when hibana is enabled', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

      const wrapper = subject(Panel.Section, mergedProps);
      checkHibana({ wrapper, componentName: 'PanelSection', props: mergedProps });
    });

    it('renders the OG Panel component correctly when hibana is not enabled', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

      const wrapper = subject(Panel.Section, mergedProps);
      checkOG({
        wrapper,
        componentName: 'PanelSection',
        pickedProps: defaultProps,
        omittedProps: systemProps,
      });
    });
  });

  describe('Panel Footer', () => {
    const defaultProps = {
      left: 'foo',
      right: 'bar',
    };

    const systemProps = {
      my: '100',
    };
    const mergedProps = { ...systemProps, ...defaultProps };

    it('renders the Hibana Panel component correctly when hibana is enabled', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

      const wrapper = subject(Panel.Footer, mergedProps);
      checkHibana({ wrapper, componentName: 'PanelFooter', props: mergedProps });
    });

    it('renders the OG Panel component correctly when hibana is not enabled', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

      const wrapper = subject(Panel.Footer, mergedProps);
      checkOG({
        wrapper,
        componentName: 'PanelFooter',
        pickedProps: defaultProps,
        omittedProps: systemProps,
      });
    });
  });
});
