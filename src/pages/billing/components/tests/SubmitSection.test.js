import React from 'react';
import SubmitSection from '../SubmitSection';
import { shallow } from 'enzyme';
import { useFeatureChangeContext } from '../../context/FeatureChangeContext';
import Brightback from 'src/components/brightback/Brightback';

jest.mock('../../context/FeatureChangeContext');

describe('SubmitSection: ', () => {
  describe('SubmitSection: ', () => {
    const subject = (props = {}, contextState = {}) => {
      useFeatureChangeContext.mockReturnValue({
        ...contextState,
      });
      return shallow(<SubmitSection {...props} />);
    };

    it('should render if context state isReady', () => {
      const wrapper = subject();
      expect(wrapper.find(Brightback)).toExist();
    });

    it('should render nothing if context state is loading', () => {
      const wrapper = subject({}, { loading: true });
      expect(wrapper.find(Brightback)).not.toExist();
    });

    const getButton = (subject, props = {}) => {
      const Button = subject.find(Brightback).prop('render');
      return shallow(<Button {...props} />);
    };

    it('should render the button', () => {
      const wrapper = subject();
      const button = getButton(wrapper, { enabled: true, to: 'url' });
      expect(button.prop('to')).toEqual('url');
      expect(button.prop('type')).toEqual('button');
    });

    it('should not use url if not enabled', () => {
      const wrapper = subject();
      const button = getButton(wrapper, { enabled: false, to: 'url' });
      expect(button.prop('to')).toEqual(null);
      expect(button.prop('type')).toEqual('submit');
    });
  });
});
