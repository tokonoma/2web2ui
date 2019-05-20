import React from 'react';
import AceEditor from 'react-ace';
import 'brace/ext/searchbox';
import 'brace/mode/text';
import 'brace/theme/chaos';

const Editor = ({ editorProps = {}, setOptions = {}, mode = 'text', value, ...props }) => (
  <AceEditor
    {...props}
    cursorStart={1}
    editorProps={{
      ...editorProps,
      $blockScrolling: Infinity
    }}
    fontSize={12}
    highlightActiveLine
    // note, must global import modes
    mode={mode}
    setOptions={{
      // note, disabling worker only disables linting annotations and does not affect syntax highlighting
      // see, https://github.com/securingsincity/react-ace/issues/275
      useWorker: false,
      ...setOptions,
      displayIndentGuides: false
    }}
    showPrintMargin={false}
    tabSize={2}
    theme="chaos"
    // note, template endpoint allows null content, but Ace doesn't
    value={value === null ? '' : value}
    width="auto"
  />
);

export default Editor;
