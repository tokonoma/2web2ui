import React from 'react';
import SubmitSection from '../SubmitSection';
import { shallow } from 'enzyme';
import { useFeatureChangeContext } from '../../context/FeatureChangeContext';

jest.mock('../../context/FeatureChangeContext');

describe('SubmitSection: ', () => {
  const defaultProps = {
    freePlan: {
      code: 'free-500',
    },
  };
  const subject = (props = {}, contextState = {}) => {
    useFeatureChangeContext.mockReturnValue({
      ...contextState,
    });
    return shallow(<SubmitSection {...defaultProps} {...props} />);
  };

  it('should render if context state isReady', () => {
    const wrapper = subject();

    expect(wrapper.find('Button')).toExist();
  });

  it('should render nothing if context state is loading', () => {
    const wrapper = subject({}, { loading: true });
    expect(wrapper.find('Button')).not.toExist();
  });
});
