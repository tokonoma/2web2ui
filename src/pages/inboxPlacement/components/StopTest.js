import React, { useState } from 'react';
import { Button } from '@sparkpost/matchbox';
import ConfirmationModal from 'src/components/modals/ConfirmationModal';

const RUNNING_STATUS = 'running';

const StopTest = ({ status, onStop, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  if (status !== RUNNING_STATUS) {
    return null;
  }

  return (<>
    <ConfirmationModal
      open={modalVisible}
      title="Are you sure you want to stop this test?"
      content={
        <p>
          By stopping this test no additional data will be gathered. You will not be able to restart test after
          stopping.
        </p>
      }
      onConfirm={onStop}
      onCancel={toggleModalVisibility}
      confirming={loading}
      isPending={loading}
      confirmVerb='Stop Test'
      cancelVerb='Continue Test'
    />
    <Button primary onClick={toggleModalVisibility}>Stop Test</Button>
  </>);
};

export default StopTest;
