import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import Button from '../Button';

jest.mock('src/context/HibanaContext');

describe('Button', () => {
  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = shallow(
      <Button color="orange" size="small">
        Click Me!
      </Button>,
    );

    expect(wrapper).toHaveProp({ color: 'orange', size: 'small' });
    expect(wrapper).toHaveDisplayName('Button');
  });

  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = shallow(<Button>Click Me!</Button>);

    expect(wrapper).toHaveDisplayName('HibanaButton');
  });

  describe('Button.Group', () => {
    const subject = () =>
      shallow(
        <Button.Group>
          <Button>Click Me!</Button>
          <Button>Click Me, too!</Button>
        </Button.Group>,
      );

    it('should only render matchbox component when hibana is not enabled', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
      const wrapper = subject();
      expect(wrapper).toHaveDisplayName('Button.Group');
    });

    it('should only render hibana component when hibana is enabled', () => {
      useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
      const wrapper = subject();
      expect(wrapper).toHaveDisplayName('HibanaButton.Group');
    });
  });
});
