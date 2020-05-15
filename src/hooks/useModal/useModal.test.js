import { act, renderHook } from '@testing-library/react-hooks';
import useModal from './useModal';

describe('useModal', () => {
  const subject = () => renderHook(() => useModal());

  it('sets metadata on open and unsets on close', () => {
    const message = { id: 'entity' };
    const { result } = subject();

    expect(result.current.isModalOpen).toEqual(false);
    expect(result.current.meta).toBeUndefined();

    act(() => {
      result.current.openModal(message);
    });

    expect(result.current.isModalOpen).toEqual(true);
    expect(result.current.meta).toEqual(message);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toEqual(false);
    expect(result.current.meta).toBeUndefined();
  });
});
