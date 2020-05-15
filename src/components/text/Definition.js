import React from 'react';
import useUniqueId from 'src/hooks/useUniqueId';
import Bold from './Bold';

const Definition = ({ children }) => {
  const id = useUniqueId('definition');

  return React.Children.map(children, child => {
    if (child.type === Label) {
      return React.cloneElement(child, { id });
    }

    if (child.type === Value) {
      return React.cloneElement(child, { ariaLabelledby: id });
    }

    return null;
  });
};

const Label = ({ children, id }) => {
  return <Bold id={id}>{children}</Bold>;
};
const Value = ({ ariaLabelledby, children }) => (
  <div aria-labelledby={ariaLabelledby}>{children}</div>
);

Definition.Label = Label;
Definition.Value = Value;

export default Definition;
