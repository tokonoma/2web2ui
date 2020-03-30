import React from 'react';
import Checkbox from '../Checkbox';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');

describe('Checkbox', () => {
  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = shallow(<Checkbox />);
    expect(wrapper).toHaveDisplayName('HibanaCheckbox');
  });

  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = shallow(<Checkbox />);
    expect(wrapper).toHaveDisplayName('Checkbox');
  });

  it('should only render hibana component when hibana is enabled for checkbox group', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = shallow(
      <Checkbox.Group>
        <Checkbox />
      </Checkbox.Group>,
    );
    expect(wrapper).toHaveDisplayName('HibanaCheckbox.Group');
  });

  it('should only render matchbox component when hibana is not enabled for checkbox group', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = shallow(
      <Checkbox.Group>
        <Checkbox />
      </Checkbox.Group>,
    );
    expect(wrapper).toHaveDisplayName('Checkbox.Group');
  });
});
