import React from 'react';
import AceEditor from 'react-ace';
import 'brace/ext/searchbox';
import 'brace/theme/tomorrow_night_bright';

const Editor = ({ editorProps = {}, setOptions = {}, ...props }) => (
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
    width="auto"
  />
);

export default Editor;
