import React from 'react';
import { render, queryByText } from '@testing-library/react';
import { hash } from './hash';
import useABTest from './useABTest';

jest.mock('./hash');

const VariantA = () => <h1>a</h1>;

const VariantB = () => <h1>b</h1>;

const VariantC = () => <h1>c</h1>;

describe('useABTest', () => {
  const MockComponent = ({ testName, variants, uid, onVariantLoad }) => {
    const Variant = useABTest({ testName, variants, uid, onVariantLoad });
    return <Variant />;
  };

  const subject = (testName, variants, uid, onVariantLoad) => {
    return render(
      <MockComponent
        variants={variants}
        uid={uid}
        onVariantLoad={onVariantLoad}
        testName={testName}
      />,
    );
  };

  it('gets the same variant based on hash', () => {
    hash.mockImplementation(() => '1');
    const { container: container1 } = subject('Test 1', [VariantA, VariantB, VariantC], '123');
    const { container: container2 } = subject('Test 1', [VariantA, VariantB, VariantC], '123');

    expect(queryByText(container1, 'b')).toBeInTheDocument();
    expect(queryByText(container2, 'b')).toBeInTheDocument();
  });

  it('gets a different variant based on hash', () => {
    hash.mockImplementation(() => '0');
    const { container: container1 } = subject('Test 1', [VariantA, VariantB, VariantC], '123');
    hash.mockImplementation(() => '1');
    const { container: container2 } = subject('Test 1', [VariantA, VariantB, VariantC], '234');

    expect(queryByText(container1, 'a')).toBeInTheDocument();
    expect(queryByText(container2, 'b')).toBeInTheDocument();
  });

  it('logs to pendo by default', () => {
    window.pendo = {};
    window.pendo.track = jest.fn();
    hash.mockImplementation(() => '0');
    subject('Test 1', [VariantA, VariantB, VariantC], '123');
    expect(window.pendo.track).toBeCalledWith('Test 1 | VariantA');
  });

  it('calls onVariantLoad instead of pendo track when passed', () => {
    window.pendo = {};
    window.pendo.track = jest.fn();
    hash.mockImplementation(() => '0');
    const onVariantLoad = jest.fn();
    subject('Test 1', [VariantA, VariantB, VariantC], '123', onVariantLoad);
    expect(window.pendo.track).not.toBeCalledWith('Test 1 | VariantA');
    expect(onVariantLoad).toBeCalledWith({
      uid: '123',
      testName: 'Test 1',
      variantName: 'VariantA',
    });
  });
});
