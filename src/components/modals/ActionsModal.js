import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button } from '@sparkpost/matchbox';
import { Loading } from 'src/components/loading/Loading';
import Modal from './Modal';
import styles from './ActionsModal.module.scss';

const ActionsModal = ({
  actions,
  content,
  isConfirming,
  isLoading,
  isOpen,
  onCancel,
  title
}) => (
  <Modal open={isOpen} onClose={onCancel}>
    <Panel title={title} accent>
      {isLoading ? (
        <Panel.Section className={styles.Loading}>
          <Loading />
        </Panel.Section>
      ) : (
        <>
          <Panel.Section>
            {content}
          </Panel.Section>
          <Panel.Section>
            <div className={styles.Buttons}>
              <div>
                {actions.map((action, index) => (
                  <Button
                    className={styles.ActionButton}
                    disabled={isConfirming}
                    key={index}
                    name="action-modal-button"
                    onClick={action.onClick}
                    primary={true}
                  >
                    {action.content}
                  </Button>
                ))}
              </div>
              {onCancel && (
                <Button
                  disabled={isConfirming}
                  name="action-cancel-modal-button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
            </div>
          </Panel.Section>
        </>
      )}
    </Panel>
  </Modal>
);

ActionsModal.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.node.isRequired,
      onClick: PropTypes.func.isRequired
    })
  ).isRequired,
  content: PropTypes.node.isRequired,
  isConfirming: PropTypes.bool,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  title: PropTypes.string
};

export default ActionsModal;
