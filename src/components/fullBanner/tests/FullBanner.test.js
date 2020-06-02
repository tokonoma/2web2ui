import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccessTime } from '@sparkpost/matchbox-icons';
import FullBanner from '../FullBanner';
import TestApp from 'src/__testHelpers__/TestApp';

jest.mock('src/hooks/useHibanaOverride', () => styles => styles);

describe('FullBanner', () => {
  it('renders with passed in children', () => {
    const { getByText } = render(
      <FullBanner>
        <p>This is some child content</p>
      </FullBanner>,
    );

    expect(getByText('This is some child content')).toBeInTheDocument();
  });

  it('renders with passed in class names', () => {
    const { container } = render(<FullBanner className="my-class">Hello, world.</FullBanner>);
    const el = container.querySelector('.my-class');

    expect(el).toBeTruthy();
  });

  it('has an optional close button child with "Close" screen reader content that invokes the passed in click handler', () => {
    const mockClickHandler = jest.fn();
    // TODO; `TestApp` required for `Button` component. Can be removed when OG theme is removed
    const { getByText } = render(
      <TestApp>
        <FullBanner>
          <FullBanner.CloseButton onClick={mockClickHandler} />
        </FullBanner>
      </TestApp>,
    );

    userEvent.click(getByText('Close'));

    expect(mockClickHandler).toHaveBeenCalled();
  });

  it('renders with the passed in icon', () => {
    const { container } = render(
      <FullBanner>
        <FullBanner.Icon as={AccessTime} />
      </FullBanner>,
    );
    const el = container.querySelector('svg');

    expect(el).toBeTruthy();
  });

  it('renders with `role="alert"`', () => {
    const { getByRole } = render(
      <FullBanner>
        <p>Some required children</p>
      </FullBanner>,
    );

    expect(getByRole('alert')).toBeInTheDocument();
  });

  it('has an optional link component (that defaults semantically to "button") that invokes the passed in click handler when clicked', () => {
    const mockClickHandler = jest.fn();
    // TODO; `TestApp` required for `Button` component. Can be removed when OG theme is removed
    const { getByRole, getByText } = render(
      <TestApp>
        <FullBanner>
          <FullBanner.Link onClick={mockClickHandler}>Click Me</FullBanner.Link>
        </FullBanner>
      </TestApp>,
    );

    userEvent.click(getByText('Click Me'));

    expect(getByRole('button')).toBeInTheDocument();
    expect(mockClickHandler).toHaveBeenCalled();
  });
});
