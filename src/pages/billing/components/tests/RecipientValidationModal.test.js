import React from 'react';
import { shallow } from 'enzyme';
import RecipientValidationModal from '../RecipientValidationModal';

describe('Component: RecipientValidationModal', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      usage: {
        recipient_validation: {
          month: { used: 123123 },
          timestamp: '2019-06-10T00:00:00.000Z'
        }
      }
    };
    wrapper = shallow(< RecipientValidationModal {...props} />);
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
