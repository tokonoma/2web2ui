import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import Radio from '../Radio';

jest.mock('src/context/HibanaContext');

describe('Radio Matchbox component wrapper', () => {
  const subject = () => {
    const defaultProps = { id: 'radio-id', label: 'radio-label' };
    return shallow(<Radio {...defaultProps}></Radio>);
  };

  it('renders the Hibana version of the Radio component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('HibanaRadio');
  });

  it('renders default(OG) version of the Radio component correctly when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('OGRadio');
  });

  describe('Radio.Group', () => {
    const subject = () => {
      const defaultProps = { id: 'radio-group-id', label: 'radio-group-label' };
      return shallow(<Radio.Group {...defaultProps}>Children...</Radio.Group>);
    };
    it('renders the Hibana version of the Radio.Group component correctly when hibana is enabled', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

      const wrapper = subject();

      expect(wrapper).toHaveDisplayName('HibanaRadio.Group');
    });

    it('renders default(OG) version of the Radio.Group component correctly when hibana is not enabled', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

      const wrapper = subject();

      expect(wrapper).toHaveDisplayName('OGRadio.Group');
    });
  });
});
