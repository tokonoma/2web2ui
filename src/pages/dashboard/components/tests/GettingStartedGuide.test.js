import React from 'react';
import { shallow } from 'enzyme';
import { GettingStartedGuide } from '../GettingStartedGuide';

//TODO: THIS TEST WILL NEED TO BE UPDATED WHEN AC-1080 IS IMPLEMENTED
describe('GettingStartedGuide', () => {
  const subject = (props) => (shallow(<GettingStartedGuide {...props} />));
  it('should render correctly when guide is at bottom or when guide is at top', () => {
    expect(subject({ isGuideAtBottom: true })).toMatchSnapshot();
    expect(subject({ isGuideAtBottom: false })).toMatchSnapshot();
  });
});
