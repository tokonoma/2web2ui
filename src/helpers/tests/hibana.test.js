import { omitSystemProps } from '../hibana';

describe('hibana utils', () => {
  it('removes styled system props', () => {
    const props = {
      className: 'test',
      mt: 1,
      py: 5,
    };

    expect(omitSystemProps(props)).toEqual({ className: 'test' });
  });

  it('only removes styled system props', () => {
    const props = {
      className: 'test',
      mt: 1,
      py: 5,
      color: 'red',
    };

    expect(omitSystemProps(props, ['color'])).toEqual({ className: 'test', color: 'red' });
  });

  // This might not actually be a thing that happens, but wanted to prove that it's not
  // a generic truthy check to add props back in
  it('only removes styled system props even if null', () => {
    const props = {
      className: 'test',
      mt: 1,
      py: 5,
      color: null,
    };

    expect(omitSystemProps(props, ['color'])).toEqual({ className: 'test', color: null });
  });

  it('only removes styled system props even if undefined', () => {
    const props = {
      className: 'test',
      mt: 1,
      py: 5,
      color: undefined,
    };

    expect(omitSystemProps(props, ['color'])).toEqual({ className: 'test' });
  });
});
