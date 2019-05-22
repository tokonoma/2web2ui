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
    const csvErrors = [
      'Line 73: Too many notes',
      'Line 247: Vanilla is unacceptable'
    ];

    const recipients = [{ address: { name: 'foo', email: 'foo@domain.com' }}];

    it('parses CSV when CSV is uploaded', () => {
      parseRecipientListCsv.mockImplementationOnce(() => Promise.resolve());
      wrapper.setProps({ csv: 'fooCSV' });
      expect(parseRecipientListCsv).toHaveBeenCalledWith('fooCSV');
    });

    it('saves recipients when valid', async () => {
      parseRecipientListCsv.mockImplementationOnce(() => Promise.resolve(recipients));
      await wrapper.instance().parseCsv();
      expect(wrapper.state('recipients')).toEqual(recipients);
    });

    it('alerts errors on parsing error', async () => {
      parseRecipientListCsv.mockImplementationOnce(() => Promise.reject(csvErrors));
      await wrapper.instance().parseCsv();
      expect(props.showAlert).toHaveBeenCalledWith({ type: 'error', message: csvErrors });
    });

    it('resets current recipients when new csv can not be parsed', async () => {
      wrapper.setState({ recipients });
      expect(wrapper.state('recipients')).toEqual(recipients);
      parseRecipientListCsv.mockImplementationOnce(() => Promise.reject(csvErrors));
      await wrapper.instance().parseCsv();
      expect(wrapper.state('recipients')).toEqual([]);
    });
  });

  describe('createRecipientsList', () => {
    let data;
    beforeEach(() => {
      data = { name: 'Foo', id: 'foo', description: 'foo bar' };
    });

    it('makes a POST request with recipients', async () => {
      await wrapper.instance().createRecipientsList(data);
      expect(props.createRecipientList).toHaveBeenCalledWith({ name: 'Foo', id: 'foo', description: 'foo bar', recipients: []});
    });

    it('does not include csv prop in POST request', async () => {
      await wrapper.instance().createRecipientsList({ ...data, csv: 'hello' });
      expect(props.createRecipientList.mock.calls[0][0]).not.toHaveProperty('csv');
    });

    it('shows alert with rejected recipients', async () => {
      props.createRecipientList.mockReturnValue(Promise.resolve({ id: 101, total_rejected_recipients: 2 }));
      await wrapper.instance().createRecipientsList(data);
      expect(props.showAlert.mock.calls[0][0]).toMatchObject({ type: 'success', message: 'Successfully created recipient list. 2 recipients were rejected!' });
    });
  });
});
