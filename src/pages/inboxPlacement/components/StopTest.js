import React, { useCallback, useState } from 'react';
import { Button } from '@sparkpost/matchbox';
import ConfirmationModal from 'src/components/modals/ConfirmationModal';
import { STATUS } from '../constants/test';
import { connect } from 'react-redux';
import { stopInboxPlacementTest } from 'src/actions/inboxPlacement';

export const StopTest = (props) => {
  const { status, id, loading, reload, stopInboxPlacementTest } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const stopTest = useCallback(() => {
    stopInboxPlacementTest(id).then(reload);
  }, [id, reload, stopInboxPlacementTest]);

  if (status !== STATUS.RUNNING) {
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
      onConfirm={stopTest}
      onCancel={toggleModalVisibility}
      confirming={loading}
      isPending={loading}
      confirmVerb='Stop Test'
      cancelVerb='Continue Test'
    />
    <Button primary size='large' onClick={toggleModalVisibility}>Stop Test</Button>
  </>);
};

function mapStateToProps(state) {
  return {
    loading: state.inboxPlacement.stopTestPending
  };
}

export default connect(mapStateToProps, { stopInboxPlacementTest })(StopTest);
