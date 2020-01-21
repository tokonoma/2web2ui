import React, { useState } from 'react';
import { Button } from '@sparkpost/matchbox';
import UpdatePaymentForm from 'src/components/billing/UpdatePaymentForm';
import { Modal } from 'src/components';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  function toggle() {
    setIsShowing(!isShowing);
  }
  return [isShowing, toggle];
};
export function AddPaymentMethod() {
  const [modalOpen, toggleModal] = useModal();

  return (
    <>
      <Button color="orange" onClick={toggleModal}>
        Add Payment Method
      </Button>
      {modalOpen && (
        <Modal open={modalOpen} onClose={toggleModal}>
          <UpdatePaymentForm onCancel={toggleModal} />
        </Modal>
      )}
    </>
  );
}
