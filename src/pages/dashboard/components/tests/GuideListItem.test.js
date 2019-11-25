import React from 'react';
import { shallow } from 'enzyme';
import { GuideListItem } from '../GuideListItem';

describe('GettingStartedGuide', () => {
  const defaultProps = {
    itemCompleted: true,
    children: null,
    action: {
      name: 'Button',
      onClick: jest.fn()
    }
  };

  const subject = (props) => (shallow(<GuideListItem {...defaultProps} {...props} />));

  it('should render a orange button only when list item is not complete', () => {
    expect(subject({ itemCompleted: false }).find('Button').prop('color')).toBe('orange');
    expect(subject({ itemCompleted: true }).find('Button').prop('color')).not.toBe('orange');

  });

  it('should a CheckCircleOutline when the list item is complete and a RadioButton unchecked when it is not complete', () => {
    expect(subject({ itemCompleted: true }).find('CheckCircleOutline')).toHaveLength(1);
    expect(subject({ itemCompleted: false }).find('RadioButtonUnchecked')).toHaveLength(1);
  });
});
