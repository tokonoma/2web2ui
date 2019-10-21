import React from 'react';
import SubmitSection from '../SubmitSection';
import { shallow } from 'enzyme';
import { useFeatureChangeContext } from '../../context/FeatureChangeContext';
import Brightback from 'src/components/brightback/Brightback';

jest.mock('../../context/FeatureChangeContext');

describe('SubmitSection: ', () => {
  describe('SubmitSection: ', () => {
    const defaultContextState = {
      isReady: true
    };

    const subject = (props = {}, contextState = {}) => {
      useFeatureChangeContext.mockReturnValue({
        ...defaultContextState,
        ...contextState
      });
      return shallow(<SubmitSection {...props} />);
    };

    it('should render if context state isReady', () => {
      const wrapper = subject();
      expect(wrapper.find(Brightback)).toExist();
    });

    it('should render nothing if context state is not ready', () => {
      const wrapper = subject({}, { isReady: false });
      expect(wrapper.find(Brightback)).not.toExist();
    });

    const getButton = (subject, props = {}) => subject.find(Brightback).prop('render')(props);

    it('should render the button', () => {
      const wrapper = subject();
      const button = getButton(wrapper, { enabled: true, to: 'url' });
      expect(button).toMatchSnapshot();
    });

    it('should not use url if not enabled', () => {
      const wrapper = subject();
      const button = getButton(wrapper, { enabled: false, to: 'url' });
      expect(button).toMatchSnapshot();
    });
  });
});
