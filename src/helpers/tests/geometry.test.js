import * as geometry from '../geometry';

it('Should get client rectangle dimensions for provided node', () => {
  const mockRef = { current: { getBoundingClientRect: jest.fn(() => 'mock rect') }};
  expect(geometry.getBoundingClientRect(mockRef)).toEqual('mock rect');
});
