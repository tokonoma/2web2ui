import React from 'react';
import { shallow } from 'enzyme';
import FeatureChangeSection from '../FeatureChangeSection';
import { useFeatureChangeContext } from '../../context/FeatureChangeContext';

jest.mock('../../context/FeatureChangeContext');

const defaultContextState = {
  loading: false,
  features: [],
};

const subject = (contextState = {}) => {
  useFeatureChangeContext.mockReturnValue({
    ...defaultContextState,
    ...contextState,
  });
  return shallow(<FeatureChangeSection />);
};

describe('Feature Change Section', () => {
  it('should render nothing with ', () => {
    expect(subject()).toBeEmptyRender();
  });

  it('should render loading', () => {
    expect(subject({ loading: true, features: ['not-empty'] }).find('Loading')).toExist();
  });

  it('should render features', () => {
    const wrapper = subject({
      features: [
        {
          key: 'feature-key',
          label: 'My Feature',
          description: 'This is my feature but it is no good',
          action: <button>My action</button>,
          value: false,
        },
      ],
    });
    expect(wrapper).toMatchSnapshot();
  });
});
