import React from 'react';
import { shallow } from 'enzyme';
import { RecipientListForm, asyncValidate } from '../RecipientListForm';
import getConfig from 'src/helpers/getConfig';
jest.mock('src/helpers/getConfig');

describe('RecipientListForm', () => {
  let props;
  let formValues;
  let csv;

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
    };
    formValues = {
      name: 'Freddie II Jr',
      id: 'fred-2-jr',
      description: 'Royalty amongst the fredericks',
    };

    csv = 'email,metadata\nscratch@example.com,"{""flavor"":""vanilla""}"\n';
  });

  it('defaults to create mode', () => {
    const wrapper = shallow(<RecipientListForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly in create mode', () => {
    const wrapper = shallow(<RecipientListForm editMode={false} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly in edit mode', () => {
    const wrapper = shallow(<RecipientListForm editMode={true} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders CSV errors', () => {
    const wrapper = shallow(<RecipientListForm editMode={false} {...props} />);
    const csvErrors = ['Line 73: Too many notes', 'Line 247: Vanilla is unacceptable'];
    wrapper.setProps({ error: csvErrors });
    expect(wrapper).toMatchSnapshot();
  });

  it('should disable form elements on submit', () => {
    const wrapper = shallow(<RecipientListForm submitting={true} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should submit without recipients', async () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<RecipientListForm onSubmit={onSubmit} {...props} />);
    await wrapper.instance().preSubmit(formValues);
    expect(onSubmit).toHaveBeenCalledWith(formValues);
  });

  it('should submit with recipients', async () => {
    const formValuesWithCsv = { csv, ...formValues };
    const parsedFormValues = {
      recipients: [
        {
          address: {
            email: 'scratch@example.com',
          },
          metadata: { flavor: 'vanilla' },
        },
      ],
      ...formValues,
    };
    const onSubmit = jest.fn();
    const wrapper = shallow(<RecipientListForm onSubmit={onSubmit} {...props} />);
    await wrapper.instance().preSubmit(formValuesWithCsv);
    expect(onSubmit).toHaveBeenCalledWith(parsedFormValues);
  });

  it('should throw on submit if CSV parsing fails', () => {
    const csv = 'email,metadata\nscratchexample.com,"{""flavor"":""vanilla"""\n';
    const formValuesWithCsv = { csv, ...formValues };
    const onSubmit = jest.fn();
    const wrapper = shallow(<RecipientListForm onSubmit={onSubmit} {...props} />);
    expect(onSubmit).not.toHaveBeenCalled();
    return expect(wrapper.instance().preSubmit(formValuesWithCsv)).rejects.toMatchSnapshot();
  });

  describe('the asyncValidate function', () => {
    it('throws an error when the passed in CSV size is higher than the max recipient list config size', async () => {
      const mockCSV = new File(['ab'], 'mock.csv');
      getConfig.mockReturnValue(16); // Mocking the config value for max upload size - instead of 12 MB, just 1 byte for testing purposes

      await expect(asyncValidate({ csv: mockCSV })).rejects.toStrictEqual({
        csv: 'Upload size 17B exceeds the max limit of 16B. Please upload a smaller file.',
      });
    });

    it('does not throw an error when the passed in CSV size is lower than the max recipient list config size', async () => {
      const mockCSV = new File(['ab'], 'mock.csv');
      getConfig.mockReturnValue(18); // Mocking the config value for max upload size - instead of 12 MB, just 1 byte for testing purposes

      // No error is returned if the file size is within the configuration limit
      await expect(asyncValidate({ csv: mockCSV })).resolves.toBe(undefined);
    });
  });
});
