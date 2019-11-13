import React from 'react';
import { shallow } from 'enzyme';
import { GettingStartedGuide } from '../GettingStartedGuide';
import { ArrowDownward } from '@sparkpost/matchbox-icons';

describe('GettingStartedGuide', () => {
  const subject = (props) => (shallow(<GettingStartedGuide {...props} />));
  it('should render correctly when guide is at bottom or when guide is at top', () => {
    expect(subject({ isGuideAtBottom: true }).find('Panel').prop('actions')).toBe(null);
    expect(subject({ isGuideAtBottom: false }).find('Panel').prop('actions')).toEqual(expect.arrayContaining([{ 'color': 'blue', 'content': <span> Move to Bottom <ArrowDownward size="20" /> </span>, 'onClick': undefined }]));
  });
});


