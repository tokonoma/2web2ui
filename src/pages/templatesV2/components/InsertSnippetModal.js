/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Panel,
  Label,
  Button
} from '@sparkpost/matchbox';
import PageLink from 'src/components/pageLink';
import { Typeahead, TypeaheadItem } from 'src/components/typeahead/Typeahead';
import ButtonWrapper from 'src/components/buttonWrapper';
import PanelLoading from 'src/components/panelLoading';
import CopyField from 'src/components/copyField';
import { slugToFriendly } from 'src/helpers/string';

const InsertSnippetModal = (props) => {
  const {
    open,
    loading,
    onClose,
    getSnippets
  } = props;

  useEffect(() => {
    //getSnippets();
  });

  if (loading) {
    return <PanelLoading/>;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton={true}
    >
      <Panel
        accent
        title="Add a snippet"
        sectioned
      >
        <form>
          <p>Snippets are a great way to manage sections like headers or footers that are used across multiple templates. Simply edit your snippet, and that change will populate across all your templates.</p>

          {/* <Typeahead
            disabled={snippets.length === 0}
            helpText={
              snippets.length === 0 ? (
                <span>
                  You have not created a snippet. {
                    <PageLink to="/snippets/create">Create your first snippet</PageLink>
                  }
                </span>
              ) : ''
            }
            itemToString={(snippet) => (
              snippet ? `${snippet.name || slugToFriendly(snippet.id)} (${snippet.id})` : ''
            )}
            label="Snippet"
            name="snippetTypeahead"
            onChange={this.handleChange}
            placeholder={snippets.length === 0 ? '' : 'Type to search...'}
            renderItem={({ id, name }) => (
              <TypeaheadItem id={id} label={name || slugToFriendly(id)} />
            )}
            results={snippets}
          /> */}

          <Label id="snippet-copy-field">Snippet Code</Label>

          <CopyField
            id="snippet-copy-field"
            value="A string"
          />

          <ButtonWrapper>
            <Button color="orange">
              Copy Code
            </Button>
          </ButtonWrapper>
        </form>
      </Panel>
    </Modal>
  );
};

export default InsertSnippetModal;
