import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import Tooltip from '../Tooltip';

jest.mock('src/context/HibanaContext');

describe('Tooltip Matchbox component wrapper', () => {
  const subject = props => {
    return shallow(<Tooltip {...props}>Children...</Tooltip>);
  };

  it('renders the Hibana version of the Tooltip component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('HibanaTooltip');
  });

  it('only renders passed in children when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('OGTooltip');
  });
});
