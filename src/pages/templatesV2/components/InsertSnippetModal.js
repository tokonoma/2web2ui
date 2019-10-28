/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Panel,
  Label,
  Button
} from '@sparkpost/matchbox';
import copy from 'copy-to-clipboard';
import PageLink from 'src/components/pageLink';
import { Typeahead, TypeaheadItem } from 'src/components/typeahead/Typeahead';
import ButtonWrapper from 'src/components/buttonWrapper';
import PanelLoading from 'src/components/panelLoading';
import CopyField from 'src/components/copyField';
import { slugToFriendly } from 'src/helpers/string';
import useEditorContext from '../hooks/useEditorContext';

const ModalWrapper = (props) => {
  const {open, onClose, children} = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton={true}
    >
      {children}
    </Modal>
  );
}

const InsertSnippetModal = (props) => {
  const { open, onClose } = props;
  const modalProps = { open, onClose };
  const {
    getSnippets,
    snippets,
    areSnippetsLoading,
    showAlert
  } = useEditorContext();
  const renderSnippetCode = (snippetId) => `{{ render_snippet( "${snippetId || 'example-id'}" ) }}`
  const [snippetId, setSnippetId] = useState(undefined);
  const [copyFieldValue, setCopyFieldValue] = useState(renderSnippetCode());

  // Fetch snippets when the modal opens
  useEffect(() => {
    if (open) {
      getSnippets();
      setCopyFieldValue(renderSnippetCode()); // Reset to default snippet
    }
  }, [open]);

  // When the snippet ID updates, set update the copy field value
  useEffect(() => {
    setCopyFieldValue(renderSnippetCode(snippetId));
  }, [snippetId]);

  const handleTypeaheadChange = (snippet) => {
    const snippetId = !snippet ? undefined : snippet.id;

    setSnippetId(snippetId);
  };

  const handleSubmit = () => {
    copy(copyFieldValue);
    showAlert({
      type: 'success',
      message: 'Snippet copied'
    });
    onClose();
  };

  if (areSnippetsLoading) {
    return (
      <ModalWrapper {...modalProps}>
        <PanelLoading/>
      </ModalWrapper>
    )
  }

  return (
    <ModalWrapper {...modalProps}>
      <Panel title="Add a snippet" accent sectioned>
        <form onSubmit={handleSubmit}>
          <p>Snippets are a great way to manage sections like headers or footers that are used across multiple templates. Simply edit your snippet, and that change will populate across all your templates.</p>

          <Typeahead
            label="Find a Snippet"
            disabled={snippets.length === 0}
            helpText={
              snippets.length === 0 ? (
                <span>
                  You have not created a snippet.

                  <PageLink to="/snippets/create">Create your first snippet</PageLink>
                </span>
              ) : ''
            }
            itemToString={(snippet) => snippet ? `${snippet.name || slugToFriendly(snippet.id)} (${snippet.id})` : ''}
            name="snippetTypeahead"
            onChange={handleTypeaheadChange}
            placeholder={snippets.length === 0 ? '' : 'Type to search...'}
            renderItem={({ id, name }) => (
              <TypeaheadItem id={id} label={name || slugToFriendly(id)} />
            )}
            results={snippets}
            data-id="snippet-typeahead"
          />

          <Label id="snippet-copy-field">Snippet Code</Label>

          <CopyField
            id="snippet-copy-field"
            value={copyFieldValue}
          />

          <ButtonWrapper>
            <Button color="orange" onClick={handleSubmit}>
              Copy Code
            </Button>
          </ButtonWrapper>
        </form>
      </Panel>
    </ModalWrapper>
  );
};

export default InsertSnippetModal;
