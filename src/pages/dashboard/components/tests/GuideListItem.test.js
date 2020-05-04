import React from 'react';
import { shallow } from 'enzyme';
import { HibanaGuideListItem, OGGuideListItem } from '../GuideListItem';
import { Button } from 'src/components/matchbox';

describe('GuideListItem', () => {
  const defaultProps = {
    itemCompleted: true,
    children: null,
    action: {
      name: 'Button',
      onClick: jest.fn(),
    },
  };

  const hibanaSubject = props => shallow(<HibanaGuideListItem {...defaultProps} {...props} />);
  const OGSubject = props => shallow(<OGGuideListItem {...defaultProps} {...props} />);

  it('should render a orange button only when list item is not complete', () => {
    expect(
      OGSubject({ itemCompleted: false })
        .find('Button')
        .prop('color'),
    ).toBe('orange');
    expect(
      OGSubject({ itemCompleted: true })
        .find('Button')
        .prop('color'),
    ).not.toBe('orange');

    expect(
      hibanaSubject({ itemCompleted: false })
        .find('Button')
        .prop('variant'),
    ).toBe('secondary');

    expect(
      hibanaSubject({ itemCompleted: true })
        .find('Button')
        .prop('variant'),
    ).toBe('monochrome');
  });

  it('should render a Button with outline prop only when the item is complete', () => {
    expect(
      OGSubject({ itemCompleted: true })
        .find(Button)
        .prop('outline'),
    ).toBeTruthy();
    expect(
      OGSubject({ itemCompleted: false })
        .find(Button)
        .prop('outline'),
    ).not.toBeTruthy();
  });

  it('should a CheckCircleOutline when the list item is complete and a RadioButton unchecked when it is not complete', () => {
    expect(OGSubject({ itemCompleted: true }).find('CheckCircleOutline')).toHaveLength(1);
    expect(OGSubject({ itemCompleted: false }).find('RadioButtonUnchecked')).toHaveLength(1);

    expect(hibanaSubject({ itemCompleted: true }).find('CheckBox')).toHaveLength(1);
    expect(hibanaSubject({ itemCompleted: false }).find('CheckBoxOutlineBlank')).toHaveLength(1);
  });
});
