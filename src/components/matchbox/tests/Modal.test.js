import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../Modal';
import { OGModal } from '../Modal';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');
describe('Modal', () => {
  const props = {
    open: true,
    onClose: jest.fn(),
  };
  const subject = () => shallow(<Modal {...props} />);

  it('should render OGModal when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('OGModal');
  });

  it('should render HibanaModal when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('HibanaModal');
  });

  describe('OGModal', () => {
    let wrapper;

    const props = {
      open: true,
      onClose: jest.fn(),
    };

    it('should render correctly', () => {
      wrapper = shallow(<OGModal {...props}>content</OGModal>);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
