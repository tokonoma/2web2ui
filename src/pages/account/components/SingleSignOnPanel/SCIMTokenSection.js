import React from 'react';
import { Button, Modal, Panel, Stack, Text } from 'src/components/matchbox';
import { ButtonWrapper, CopyField, LabelledValue, ShortKeyCode } from 'src/components';
import useModal from 'src/hooks/useModal';
export default function SCIMTokenSection(props) {
  const { scimTokenList, newScimToken, generateScimToken, listScimToken } = props;
  const getActions =
    scimTokenList.length > 0
      ? [
          {
            content: 'Delete Token',
            onClick: () => {},
            color: 'orange',
          },
          {
            content: 'Generate SCIM Token',
            onClick: () => {
              openModal({ name: 'Override Token' });
            },
            color: 'orange',
          },
        ]
      : [
          {
            content: 'Generate SCIM Token',
            onClick: () => {
              handleGenerateToken();
            },
            color: 'orange',
          },
        ];
  const { closeModal, isModalOpen, openModal, meta: { name } = {} } = useModal();
  const handleGenerateToken = () => {
    generateScimToken().then(() => {
      openModal({ name: 'Generate SCIM Token' });
      listScimToken();
    });
  };
  const renderModalByName = name => {
    switch (name) {
      case 'Override Token':
        return (
          <Panel title="Generate SCIM Token">
            <Panel.Section>
              <Stack>
                <Text as="p" fontWeight="medium">
                  <p>Override Your Current Token?</p>
                </Text>
                <Text as="p">
                  <p>
                    Creating a new token will
                    <Text as="span" fontWeight="medium">
                      <strong> override the existing token.</strong>
                    </Text>
                  </p>
                </Text>
              </Stack>
            </Panel.Section>
            <Panel.Section>
              <ButtonWrapper>
                <Button
                  variant="primary"
                  onClick={() => {
                    closeModal();
                    handleGenerateToken();
                  }}
                >
                  Generate New Token
                </Button>
                <Button variant="secondary" onClick={() => closeModal()}>
                  Cancel
                </Button>
              </ButtonWrapper>
            </Panel.Section>
          </Panel>
        );

      default:
      case 'Generate SCIM Token':
        return (
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
                <CopyField value={newScimToken} />
              </Stack>
            </Panel.Section>
            <Panel.Section>
              <Button variant="primary" onClick={() => closeModal()}>
                Continue
              </Button>
            </Panel.Section>
          </Panel>
        );
    }
  };
  return (
    <>
      <Panel.Section title="SCIM Token" actions={getActions}>
        <LabelledValue label="Identity Provider">
          <h6>
            {scimTokenList.length > 0 ? (
              <ShortKeyCode shortKey={scimTokenList[0].short_key} />
            ) : (
              'No token generated'
            )}
          </h6>
        </LabelledValue>
      </Panel.Section>
      <Modal open={isModalOpen} onClose={() => closeModal()} showCloseButton>
        {isModalOpen && renderModalByName(name)}
      </Modal>
    </>
  );
}
