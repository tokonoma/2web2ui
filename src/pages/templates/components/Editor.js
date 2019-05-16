import React from 'react';
import AceEditor from 'react-ace';
import 'brace/ext/searchbox';
import 'brace/theme/tomorrow_night_bright';

const Editor = ({ editorProps = {}, setOptions = {}, value, ...props }) => (
  <AceEditor
    {...props}
    cursorStart={1}
    editorProps={{
      ...editorProps,
      $blockScrolling: Infinity
    }}
    fontSize={12}
    highlightActiveLine
    setOptions={{
      ...setOptions,
      displayIndentGuides: false
    }}
    showPrintMargin={false}
    tabSize={2}
    theme="tomorrow_night_bright"
    // note, template endpoint allows null content, but Ace doesn't
    value={value === null ? '' : value}
    width="auto"
  />
);

export default Editor;
