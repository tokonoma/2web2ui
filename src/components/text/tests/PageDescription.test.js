import React from 'react';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';
import { OGPageDescription, HibanaPageDescription } from '../PageDescription';

jest.mock('src/context/HibanaContext');

describe('PageDescription', () => {
  const hibanaSubject = props => {
    return render(<HibanaPageDescription {...props} />);
  };
  const OGSubject = props => {
    return render(<OGPageDescription {...props} />);
  };

  describe('with Hibana enabled', () => {
    beforeEach(() => useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]));

    it('renders with passed in children as a paragraph', () => {
      const { queryByText, container } = hibanaSubject({ children: 'Hello, world.' });

      expect(queryByText('Hello, world.')).toBeInTheDocument();
      expect(container.querySelector('p')).toBeTruthy();
    });

    it('renders with passed in class names', () => {
      const { container } = hibanaSubject({ children: 'I have classes.', className: 'foobar' });

      expect(container.querySelector('.foobar')).toBeTruthy();
    });

    it('renders with the passed in `data-id`', () => {
      const { container } = hibanaSubject({ children: 'Hello, there.', 'data-id': 'my-id' });

      expect(container.querySelector('[data-id="my-id"]')).toBeTruthy();
    });
  });

  describe('with Hibana disabled', () => {
    beforeEach(() => useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]));

    it('renders with passed in children as a paragraph', () => {
      const { queryByText, container } = OGSubject({ children: 'Hello, world.' });

      expect(queryByText('Hello, world.')).toBeInTheDocument();
      expect(container.querySelector('p')).toBeTruthy();
    });

    it('renders with passed in class names', () => {
      const { container } = OGSubject({ children: 'I have classes.', className: 'foobar' });

      expect(container.querySelector('.foobar')).toBeTruthy();
    });

    it('renders with the passed in `data-id`', () => {
      const { container } = OGSubject({ children: 'Hello, there.', 'data-id': 'my-id' });

      expect(container.querySelector('[data-id="my-id"]')).toBeTruthy();
    });
  });
});
