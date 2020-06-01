import React from 'react';
import { Button, Panel, Modal } from 'src/components/matchbox';
import { connect } from 'react-redux';
import { domainRegex } from 'src/helpers/regex';
import { PanelLoading } from 'src/components';
import { deleteMonitor } from 'src/actions/blacklist';
import { showAlert } from 'src/actions/globalAlert';

export const StopMonitoringModal = ({
  closeModal,
  deleteMonitor,
  isPending,
  monitorToDelete,
  showAlert,
}) => {
  const confirmAction = () => {
    deleteMonitor(monitorToDelete).then(() => {
      showAlert({
        type: 'success',
        message: `Stopped Monitoring ${monitorToDelete}.`,
      });
      closeModal();
    });
  };
  const renderContent = () => {
    if (!monitorToDelete) {
      return null;
    }
    return (
      <>
        <Panel.Section>
          <p>
            {`Removing this ${
              monitorToDelete.match(domainRegex) ? 'domain' : 'IP'
            } from your watchlist means you won't get notified of changes, but don't
          worry you can always add it again later.`}
          </p>
        </Panel.Section>

        <Panel.Section>
          <Button variant="primary" disabled={isPending} onClick={confirmAction}>
            Stop Monitoring
          </Button>
        </Panel.Section>
      </>
    );
  };

  const title = monitorToDelete ? `Stop Monitoring ${monitorToDelete}` : '';

  return (
    <Modal open={Boolean(monitorToDelete)} onClose={closeModal} showCloseButton={true}>
      {isPending ? (
        <PanelLoading minHeight="175px" />
      ) : (
        <Panel title={title}>{renderContent()}</Panel>
      )}
    </Modal>
  );
};

const mapStateToProps = state => ({
  isPending: state.blacklist.deleteMonitorPending || state.blacklist.monitorsPending,
});
export default connect(mapStateToProps, { deleteMonitor, showAlert })(StopMonitoringModal);
