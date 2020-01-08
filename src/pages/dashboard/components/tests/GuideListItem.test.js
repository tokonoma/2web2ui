import React from 'react';
import { shallow } from 'enzyme';
import { GuideListItem } from '../GuideListItem';
import { Button } from '@sparkpost/matchbox';

describe('GuideListItem', () => {
  const defaultProps = {
    itemCompleted: true,
    children: null,
    action: {
      name: 'Button',
      onClick: jest.fn(),
    },
  };

  const subject = props => shallow(<GuideListItem {...defaultProps} {...props} />);

  it('should render a orange button only when list item is not complete', () => {
    expect(
      subject({ itemCompleted: false })
        .find('Button')
        .prop('color'),
    ).toBe('orange');
    expect(
      subject({ itemCompleted: true })
        .find('Button')
        .prop('color'),
    ).not.toBe('orange');
  });

  it('should render a Button with outline prop only when the item is complete', () => {
    expect(
      subject({ itemCompleted: true })
        .find(Button)
        .prop('outline'),
    ).toBeTruthy();
    expect(
      subject({ itemCompleted: false })
        .find(Button)
        .prop('outline'),
    ).not.toBeTruthy();
  });

  it('should a CheckCircleOutline when the list item is complete and a RadioButton unchecked when it is not complete', () => {
    expect(subject({ itemCompleted: true }).find('CheckCircleOutline')).toHaveLength(1);
    expect(subject({ itemCompleted: false }).find('RadioButtonUnchecked')).toHaveLength(1);
  });
});
