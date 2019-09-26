import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Person } from '@sparkpost/matchbox-icons';
import useEditorContext from '../hooks/useEditorContext';
import styles from './PreviewHeader.module.scss';

const PreviewHeader = () => {
  const { preview } = useEditorContext();

  if (isEmpty(preview)) {
    return null;
  }

  return (
    <div className={styles.PreviewHeader}>
      <div className={styles.PreviewHeaderSubject}>
        {preview.subject}
      </div>
      <div className={styles.PreviewHeaderContact}>
        <div className={styles.PreviewHeaderAvatar}>
          <Person color="white" size={50} />
        </div>
        <div className={styles.PreviewHeaderAddresses}>
          <div className={styles.PreviewHeaderFrom}>
            {!preview.from.name ? (
              <strong>{preview.from.email}</strong>
            ) : (
              <>
                <strong>{preview.from.name}</strong>
                <span>{' '}</span>
                <span>{`<${preview.from.email}>`}</span>
              </>
            )}
          </div>
          <div className={styles.PreviewHeaderTo}>
            to me
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewHeader;
