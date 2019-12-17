import React from 'react';
import { render } from '@testing-library/react';
import Abbreviation from '../Abbreviation';

describe('Abbreviation', () => {
  it('renders an abbr tag with a title attribute', () => {
    const { queryByText } = render(
      <Abbreviation title="Customer Success Manager">CSM</Abbreviation>,
    );

    expect(queryByText('CSM')).toContainElement(document.querySelector('abbr'));
    expect(queryByText('CSM')).toHaveAttribute('title', 'Customer Success Manager');
  });

  it('renders with the value passed in via the "className" prop along with the default "Abbreviation" class', () => {
    const { queryByText } = render(
      <Abbreviation title="Vice President" className="my-class">
        VP
      </Abbreviation>,
    );

    expect(queryByText('VP')).toHaveClass('Abbreviation my-class');
  });

  it('renders with passed in inline styles', () => {
    const { queryByText } = render(
      <Abbreviation title="Assistant Vice President" style={{ display: 'none' }}>
        AVP
      </Abbreviation>,
    );

    expect(queryByText('AVP')).toHaveStyle('display: none;');
  });

  it('renders with passed in children', () => {
    const { queryByText } = render(
      <Abbreviation title="United States Air Force">USAF</Abbreviation>,
    );

    expect(queryByText('USAF')).toBeInTheDocument();
  });
});
