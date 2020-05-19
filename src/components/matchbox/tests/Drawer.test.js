import React from 'react';
import { shallow } from 'enzyme';
import Drawer from '../Drawer';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Drawer', () => {
  describe('Main Drawer Component', () => {
    const defaultProps = {
      id: 'drawer-id',
      open: true,
      onClose: jest.fn(),
    };
    const subject = () => shallow(<Drawer {...defaultProps} />);
    it('should throw error with drawer using the component', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
      expect(subject).toThrowError();
    });
    it('should render in hibana', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
      expect(subject().find('Drawer')).toExist();
    });
  });

  describe('Drawer.Header', () => {
    const subject = () => shallow(<Drawer.Header />);
    it('should throw error with drawer using the component', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
      expect(subject).toThrowError();
    });
    it('should render in hibana', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
      const defaultProps = { showCloseButton: true };
      expect(subject()).toHaveProp(defaultProps);
    });
  });

  describe('Drawer.Content', () => {
    const subject = () => shallow(<Drawer.Content />);
    it('should throw error with drawer using the component', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
      expect(subject).toThrowError();
    });
    it('should render in hibana', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
      expect(subject()).toExist();
    });
  });

  describe('Drawer.Footer', () => {
    const subject = () => shallow(<Drawer.Footer />);
    it('should throw error with drawer using the component', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
      expect(subject).toThrowError();
    });
    it('should render in hibana', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
      expect(subject()).toExist();
    });
  });
});
