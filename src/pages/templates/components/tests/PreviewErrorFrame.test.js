import React from 'react';
import { render } from '@testing-library/react';
import PreviewErrorFrame from '../PreviewErrorFrame';

describe('PreviewErrorFrame', () => {
  const DEFAULT_HEADING = 'Oh no! An Error Occurred';
  const DEFAULT_DESCRIPTION =
    'If you notice this happens often, check your substitution data or code syntax as these are frequent causes of preview errors.';

  // NOTE: Most of the component behavior is tested using Cypress integration tests

  it('renders default content when passed in errors are `undefined`', () => {
    const { queryByText } = render(<PreviewErrorFrame errors={undefined} />);

    expect(queryByText(DEFAULT_HEADING)).toBeInTheDocument();
    expect(queryByText(DEFAULT_DESCRIPTION)).toBeInTheDocument();
  });

  it('renders default content when passed in errors are `null`', () => {
    const { queryByText } = render(<PreviewErrorFrame errors={null} />);

    expect(queryByText(DEFAULT_HEADING)).toBeInTheDocument();
    expect(queryByText(DEFAULT_DESCRIPTION)).toBeInTheDocument();
  });
});
