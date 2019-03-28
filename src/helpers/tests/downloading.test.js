import * as downloading from '../downloading';
import _ from 'lodash';
import Papa from 'papaparse';

describe('download helper', () => {

  describe('format to CSV', () => {
    const data = _.times(5, (i) => ({ key: i + 1 }));
    Papa.unparse = jest.fn(() => 'mydata');

    it('should map simple collections to papa parse and return as a String', () => {
      expect(typeof downloading.formatToCsv({ data, returnBlob: false })).toBe('string');
      expect(Papa.unparse).toHaveBeenCalledWith([{ 'key': 1 }, { 'key': 2 }, { 'key': 3 }, { 'key': 4 }, { 'key': 5 }]);
    });

    it('should map simple collections to papa parse and return as a Blob', () => {
      expect(typeof downloading.formatToCsv({ data, returnBlob: true })).toBe('object');
      expect(Papa.unparse).toHaveBeenCalledWith([{ 'key': 1 }, { 'key': 2 }, { 'key': 3 }, { 'key': 4 }, { 'key': 5 }]);
    });

    it('should stringify complex objects', () => {
      const complexData = _.cloneDeep(data);
      complexData.push({ key: { subkey: 'value' }}, { key: [1,2,3]});
      downloading.formatToCsv({ data: complexData });
      expect(Papa.unparse).toHaveBeenCalledWith([{ 'key': 1 }, { 'key': 2 }, { 'key': 3 }, { 'key': 4 }, { 'key': 5 }, { 'key': '{"subkey":"value"}' }, { 'key': '[1,2,3]' }]);
    });
  });


  describe('Download file', () => {
    let linkMock; let createElementSpy; let objectURL;
    beforeEach(() => {
      jest.useFakeTimers();

      linkMock = { setAttribute: jest.fn(), click: jest.fn() };

      objectURL = 'a URL';
      URL.createObjectURL = jest.fn(() => objectURL);
      URL.revokeObjectURL = jest.fn();

      createElementSpy = jest.spyOn(document, 'createElement')
        .mockImplementationOnce(() => linkMock);

      document.body.appendChild = jest.fn();
      document.body.removeChild = jest.fn();

    });

    afterAll(() => {
      jest.useRealTimers();
    });

    test('download() should download a file', () => {
      const name = 'name of file';
      const url = 'url of file';
      downloading.download({ name, url });

      expect(URL.createObjectURL).toHaveBeenCalledWith(url);
      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(linkMock.href).toEqual(objectURL);
      expect(linkMock.setAttribute).toHaveBeenCalledWith('download', name);
      expect(linkMock.click).toHaveBeenCalledTimes(1);
      expect(document.body.appendChild).toHaveBeenCalledWith(linkMock);


      expect(document.body.removeChild).not.toHaveBeenCalled();
      expect(URL.revokeObjectURL).not.toHaveBeenCalled();

      jest.runAllTimers();

      expect(document.body.removeChild).toHaveBeenCalledWith(linkMock);
      expect(URL.revokeObjectURL).toHaveBeenCalledWith(objectURL);

    });
  });
});
