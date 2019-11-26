import React, { useState } from 'react';
import { Modal, Panel, Button } from '@sparkpost/matchbox';
import ButtonWrapper from 'src/components/buttonWrapper';
import PanelLoading from 'src/components/panelLoading';
import useEditorContext from '../../hooks/useEditorContext';
import { RedirectAndAlert } from 'src/components/globalAlert';
import { routeNamespace } from '../../constants/routes';
import styles from './DeleteTemplateModal.module.scss';

const DeleteTemplateModal = (props) => {
  const { open, onCancel } = props;
  const {
    deleteTemplate,
    isDeletePending,
    template
  } = useEditorContext();
  const [hasSuccessRedirect, setSuccessRedirect] = useState(false);
  const handleDelete = () => {
    deleteTemplate({ id: template.id, subaccountId: template.subaccount_id })
      .then(() => setSuccessRedirect(true));
  };

  return (
    <>
      {hasSuccessRedirect &&
        <RedirectAndAlert
          to={`/${routeNamespace}`}
          alert={{
            type: 'success',
            message: 'Template deleted'
          }}
        />
      }

      <Modal
        open={open}
        showCloseButton
        onClose={onCancel}
      >
        {isDeletePending && <PanelLoading/>}

        {!isDeletePending && (
          <Panel title="Are you sure you want to delete your template?">
            <Panel.Section>
              <p>If so, the <strong className={styles.WarningText}>published version and any drafts</strong> will all be deleted.</p>

              <ButtonWrapper>
                <Button
                  destructive
                  onClick={handleDelete}
                >
                  Delete All Versions
                </Button>

                <Button
                  className={styles.CancelButton}
                  onClick={onCancel}
                >
                  Keep Editing
                </Button>
              </ButtonWrapper>
            </Panel.Section>
          </Panel>
        )}
      </Modal>
    </>
  );
};

export default DeleteTemplateModal;
