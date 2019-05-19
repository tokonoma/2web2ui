import React from 'react';
import { shallow } from 'enzyme';

import { CreatePage } from '../CreatePage';
import parseRecipientListCsv from '../helpers/csv';

jest.mock('../helpers/csv');

describe('CreatePage', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      createRecipientList: jest.fn((args) => Promise.resolve({ id: args.id })),
      showAlert: jest.fn(),
      history: { push: jest.fn() },
      handleSubmit: jest.fn()
    };

    wrapper = shallow(<CreatePage {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });


  describe('parseCsv', () => {
    it('saves recipients when valid', async () => {
      const recipients = [{ address: { name: 'foo', email: 'foo@domain.com' }}];
      parseRecipientListCsv.mockImplementationOnce(() => Promise.resolve(recipients));
      await wrapper.instance().parseCsv();
      expect(wrapper.state('recipients')).toEqual(recipients);
    });

    it('alerts errors on parsing error', async () => {
      const csvErrors = [
        'Line 73: Too many notes',
        'Line 247: Vanilla is unacceptable'
      ];

      parseRecipientListCsv.mockImplementationOnce(() => Promise.reject(csvErrors));
      await wrapper.instance().parseCsv();
      expect(props.showAlert).toHaveBeenCalledWith({ type: 'error', message: csvErrors });
    });
  });

  describe('createRecipientsList', () => {
    it('should POST with recipients & without csv prop', async () => {
      const data = { name: 'Foo', id: 'foo', description: 'foo bar', csv: 'hello' };
      await wrapper.instance().createRecipientsList(data);
      expect(props.createRecipientList).toHaveBeenCalledWith({ name: 'Foo', id: 'foo', description: 'foo bar', recipients: []});
    });
  });
});
