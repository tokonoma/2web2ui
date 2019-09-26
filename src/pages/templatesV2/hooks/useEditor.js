import { useEffect, useState } from 'react';

const useEditor = ({ inlineErrors = []}) => {
  const [annotations, setAnnotations] = useState([]);
  const [editor, setEditor] = useState(); // instance of the Ace editor

  // Merge annotations from Ace modes and append our custom inline errors
  const nextAnnotations = [
    ...annotations.filter(({ custom }) => !custom),
    ...inlineErrors.map(({ message, line }) => ({
      column: 0,
      custom: true, // tag custom annotations to be excluded during update
      row: line - 1,
      text: message,
      type: 'error'
    }))
  ];

  // note, this is a hack to work around this bug and poor behavior of annotations prop
  // see, https://github.com/securingsincity/react-ace/issues/483
  useEffect(() => {
    if (editor) {
      // note, this will trigger onValidate which should call our setAnnotations
      editor.getSession().setAnnotations(nextAnnotations);
    }
  }, [editor, JSON.stringify(nextAnnotations)]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    annotations,
    editor,
    setAnnotations,
    setEditor
  };
};

export default useEditor;
