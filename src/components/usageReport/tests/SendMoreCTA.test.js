import React from 'react';
import { shallow } from 'enzyme';
import { OGSendMoreCTA, HibanaSendMoreCTA } from '../SendMoreCTA';

describe('SendMoreCTA Component', () => {
  let props;
  let ogWrapper;
  let hibanaWrapper;

  beforeEach(() => {
    props = {
      verifyEmail: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(() => Promise.resolve()),
      openSupportTicketForm: jest.fn(),
    };

    ogWrapper = shallow(<OGSendMoreCTA {...props} />);
    hibanaWrapper = shallow(<HibanaSendMoreCTA {...props} />);
  });

  it('renders correctly', () => {
    expect(ogWrapper).toMatchSnapshot();
    expect(hibanaWrapper).toMatchSnapshot();
  });

  it('renders learn more about sending limits link', () => {
    ogWrapper.setProps({ hasSendingLimits: true });

    expect(ogWrapper).toHaveTextContent('Learn more about these limits.');

    hibanaWrapper.setProps({ hasSendingLimits: true });

    expect(hibanaWrapper).toHaveTextContent('Learn more about these limits.');
  });
});
