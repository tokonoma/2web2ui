import React from 'react';
import { shallow } from 'enzyme';
import { GettingStartedGuide } from '../GettingStartedGuide';
import { ArrowDownward } from '@sparkpost/matchbox-icons';


describe('GettingStartedGuide', () => {
  const defaultProps = {
    isGuideAtBottom: false,
    moveGuideAtBottom: jest.fn()
  };

  const subject = (props) => (shallow(<GettingStartedGuide {...defaultProps} {...props} />));

  it('should render correctly when guide is at bottom or when guide is at top', () => {
    expect(subject({ isGuideAtBottom: true }).find('Panel').prop('actions')).toBe(null);
    expect(subject({ isGuideAtBottom: false }).find('Panel').prop('actions')).toEqual(expect.arrayContaining([{ 'color': 'blue', 'content': <span> Move to Bottom <ArrowDownward size="20" /> </span>, 'onClick': defaultProps.moveGuideAtBottom }]));
  });

  it('should render Sending Step when Start Sending Button is clicked', () => {
    const instance = subject();
    instance.find('Button').simulate('click');
    expect(instance.find('Card')).toHaveLength(2);
    instance.find('Button').forEach((button) => {
      expect(['Show Me SparkPost', 'Let\'s Code'].findIndex((x) => x === button.children())).toBeTruthy();
    });
  });
});
