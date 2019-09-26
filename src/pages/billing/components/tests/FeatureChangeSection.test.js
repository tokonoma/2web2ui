import React from 'react';
import { shallow } from 'enzyme';
import FeatureChangeSection from '../FeatureChangeSection';
import { useFeatureChangeContext } from '../../context/FeatureChangeContext';

jest.mock('../../context/FeatureChangeContext');

const defaultContextState = {
  loading: false,
  isReady: true,
  features: []
};

const subject = (contextState = {}) => {
  useFeatureChangeContext.mockReturnValue({
    ...defaultContextState,
    ...contextState
  });
  return shallow(<FeatureChangeSection />);
};

describe('Feature Change Section', () => {
  it('should render', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should render loading', () => {
    expect(subject({ loading: true }).find('Loading')).toExist();
  });

  it('should render features', () => {
    const wrapper = subject({
      features: [
        {
          key: 'feature-key',
          label: 'My Feature',
          description: 'This is my feature but it is no good',
          action: <button>My action</button>,
          value: false
        }
      ]
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render message if state is not ready', () => {
    const wrapper = subject({ isReady: false });
    expect(wrapper.find('Warning')).toExist();
    expect(wrapper.find('CheckCircle')).not.toExist();
    expect(wrapper.find('div[name="status-description"]').text()).toEqual(
      'Your new plan has additional limits on features you currently use. See the list below to make the necessary changes before you can change plans.'
    );
  });
});

