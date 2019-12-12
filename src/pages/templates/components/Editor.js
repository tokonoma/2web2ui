import React from 'react';
import classNames from 'classnames';
import AceEditor from 'react-ace';
import useEditor from '../hooks/useEditor';
import 'brace/ext/searchbox';
import 'brace/mode/text';
import 'brace/theme/tomorrow_night_eighties';
import styles from './Editor.module.scss';

const Editor = ({
  editorProps = {},
  inlineErrors = [],
  mode = 'text',
  setOptions = {},
  value = '',
  readOnly,
  ...props
}) => {
  const { setAnnotations, setEditor } = useEditor({ inlineErrors });
  return (
    <div
      className={classNames(
        !props.type ? styles.EditorWrapper : styles.ForDraggableModal,
        readOnly && styles.ReadOnly,
      )}
    >
      <AceEditor
        {...props}
        readOnly={readOnly}
        annotations={[]} // do not use, see useEditor
        cursorStart={1}
        editorProps={{
          ...editorProps,
          $blockScrolling: Infinity,
        }}
        fontSize={14}
        height={'100%'} // must set height on wrapper
        highlightActiveLine
        // note, must global import modes from https://www.npmjs.com/package/brace
        mode={mode}
        onLoad={setEditor}
        onValidate={setAnnotations}
        setOptions={{
          // note, disabling worker only disables linting annotations and does not affect syntax highlighting
          // see, https://github.com/securingsincity/react-ace/issues/275
          useWorker: false,
          ...setOptions,
          displayIndentGuides: false,
        }}
        showPrintMargin={false}
        tabSize={2}
        theme="tomorrow_night_eighties"
        // note, template endpoint allows null content, but Ace doesn't
        value={value === null ? '' : value}
        width="auto"
      />
    </div>
  );
};

export default Editor;
