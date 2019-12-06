import React, { useState } from 'react';
import useRouter from 'src/hooks/useRouter';
import { Modal } from 'src/components';
import styles from './SignupModal.module.scss';
import { Panel, Button } from '@sparkpost/matchbox';
import { Close } from '@sparkpost/matchbox-icons';
import { SignupCheckIcon } from 'src/components/icons';
import _ from 'lodash';

const SignupModal = () => {
  const { location } = useRouter();
  const [isModalOpen, setModalOpen] = useState(_.get(location, 'state.fromOnboarding', false));
  return (
    <Modal open={isModalOpen} data-id="signup-modal">
      <Panel className={styles.modalContainer}>
        <div className={styles.CloseButton}>
          <Button onClick={() => setModalOpen(false)} flat>
            <Close />
          </Button>
        </div>
        <div className={styles.bodyContainer}>
          <div>
            <SignupCheckIcon />
          </div>
          <div className={styles.SuccessMessage}>Sign Up Complete!</div>
          <div>
            <Button size="large" color="orange" onClick={() => setModalOpen(false)}>
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </Panel>
    </Modal>
  );
};

export default SignupModal;
