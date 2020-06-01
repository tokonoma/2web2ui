import React from 'react';
import { Button, Modal, Panel, Stack, Text } from 'src/components/matchbox';
import { CopyField, LabelledValue } from 'src/components';
import useModal from 'src/hooks/useModal';
export default function SCIMTokenSection(props) {
  const { apiKey } = props;
  const getActions = apiKey
    ? [
        {
          content: 'Generate SCIM Token',
          onClick: () => {},
          color: 'orange',
        },
        {
          content: 'Delete Token',
          onClick: () => {},
          color: 'orange',
        },
      ]
    : [
        {
          content: 'Generate SCIM Token',
          onClick: () => {
            openModal({ name: 'First Time Token' });
          },
          color: 'orange',
        },
      ];
  const { closeModal, isModalOpen, openModal, meta: { name } = {} } = useModal();
  return (
    <>
      <Panel.Section title="SCIM Token" actions={getActions}>
        <LabelledValue label="Identity Provider">
          <h6>{apiKey ? apiKey : 'No token generated'}</h6>
        </LabelledValue>
      </Panel.Section>
      <Modal open={isModalOpen} onClose={() => closeModal()} showCloseButton>
        {isModalOpen && name === 'First Time Token' && (
          <Panel title="Generate SCIM Token">
            <Panel.Section>
              <Stack>
                <Text as="p">
                  <p>Copy this token! </p>
                </Text>
                <Text as="p">
                  <p>
                    Make sure to copy your SCIM token now.{' '}
                    <Text as="span" fontWeight="medium">
                      <strong>You won't be able to see it again!</strong>
                    </Text>
                  </p>
                </Text>
                <CopyField value={apiKey} />
              </Stack>
            </Panel.Section>
            <Panel.Section>
              <Button variant="primary" onClick={() => closeModal()}>
                Continue
              </Button>
            </Panel.Section>
          </Panel>
        )}
      </Modal>
    </>
  );
}
