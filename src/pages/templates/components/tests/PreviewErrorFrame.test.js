import React from 'react';
import { render } from '@testing-library/react';
import PreviewErrorFrame from '../PreviewErrorFrame';

describe('PreviewErrorFrame', () => {
  const DEFAULT_HEADING = 'Oh no! An Error Occurred';
  const DEFAULT_DESCRIPTION =
    'If you notice this happens often, check your substitution data or code syntax as these are frequent causes of preview errors.';

  it('renders an error with the line number and part when the error code returns with "3000"', () => {
    const { queryByText } = render(
      <PreviewErrorFrame
        errors={[{ code: '3000', message: 'mock message', part: 'mock part', line: 2 }]}
      />,
    );

    expect(queryByText(/mock message/)).toBeInTheDocument();
    expect(queryByText(/mock part/)).toBeInTheDocument();
    expect(queryByText(/line 2/)).toBeInTheDocument();
    expect(queryByText(DEFAULT_HEADING)).toBeInTheDocument();
    expect(queryByText(DEFAULT_DESCRIPTION)).toBeInTheDocument();
  });

  it('renders only the "description" field when the "message", "line", and "part" fields are not present', () => {
    const { queryByText } = render(
      <PreviewErrorFrame errors={[{ description: 'mock description' }]} />,
    );

    expect(queryByText(/mock description/)).toBeInTheDocument();
    expect(queryByText(DEFAULT_HEADING)).toBeInTheDocument();
    expect(queryByText(DEFAULT_DESCRIPTION)).toBeInTheDocument();
  });

  it('renders only the "description" field when the "code" is not "3000"', () => {
    const { queryByText } = render(
      <PreviewErrorFrame errors={[{ code: '12', description: 'mock description' }]} />,
    );

    expect(queryByText(/mock description/)).toBeInTheDocument();
    expect(queryByText(DEFAULT_HEADING)).toBeInTheDocument();
    expect(queryByText(DEFAULT_DESCRIPTION)).toBeInTheDocument();
  });

  it('renders default content when no "code" or "description" field are present', () => {
    const { queryByText } = render(<PreviewErrorFrame errors={[]} />);

    expect(queryByText(DEFAULT_HEADING)).toBeInTheDocument();
    expect(queryByText(DEFAULT_DESCRIPTION)).toBeInTheDocument();
  });

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
