import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Panel, Button } from '@sparkpost/matchbox';
import ButtonWrapper from 'src/components/buttonWrapper';
import PanelLoading from 'src/components/panelLoading';
import { RedirectAndAlert } from 'src/components/globalAlert';
import { routeNamespace } from '../../constants/routes';
import styles from './DeleteTemplateModal.module.scss';

const DeleteTemplateModal = props => {
  const { open, onClose, template, deleteTemplate, isLoading, successCallback } = props;
  const [hasSuccessRedirect, setSuccessRedirect] = useState(false);
  const handleDelete = () => {
    deleteTemplate({ id: template.id, subaccountId: template.subaccount_id }).then(() => {
      if (successCallback) {
        successCallback();
      } else {
        setSuccessRedirect(true);
      }
    });
  };

  return (
    <>
      {hasSuccessRedirect && (
        <RedirectAndAlert
          to={`/${routeNamespace}`}
          alert={{
            type: 'success',
            message: 'Template deleted',
          }}
        />
      )}

      <Modal open={open} showCloseButton onClose={onClose}>
        {isLoading ? (
          <PanelLoading minHeight="190px" />
        ) : (
          <Panel title="Are you sure you want to delete your template?">
            <Panel.Section>
              {/* The <span>s are used here to avoid the bare JSX string problem */}
              <p>
                <span>If so, the </span>
                <strong className={styles.WarningText}>published version and any drafts</strong>
                <span> will all be deleted.</span>
              </p>

              <ButtonWrapper>
                <Button destructive onClick={handleDelete}>
                  Delete All Versions
                </Button>

                <Button className={styles.CancelButton} onClick={onClose}>
                  Cancel
                </Button>
              </ButtonWrapper>
            </Panel.Section>
          </Panel>
        )}
      </Modal>
    </>
  );
};

DeleteTemplateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  template: PropTypes.object,
  deleteTemplate: PropTypes.func,
  isLoading: PropTypes.bool,
  successCallback: PropTypes.func,
};

export default DeleteTemplateModal;
