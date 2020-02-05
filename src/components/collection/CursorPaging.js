import styles from './CursorPaging.module.scss';
import { ScreenReaderOnly } from '@sparkpost/matchbox';
import { FirstPage } from '@sparkpost/matchbox-icons';
import React from 'react';
import { Button, Pager } from '@sparkpost/matchbox';

export const CursorPaging = ({
  currentPage,
  handlePageChange,
  previousDisabled,
  nextDisabled,
  handleFirstPage,
  perPage,
  totalCount,
}) => (
  // previousDisabled and nextDisabled are boolean values.
  <div className={styles.PageButtons}>
    <Button
      className={styles.RewindButton}
      disabled={currentPage === 1}
      key="rewind"
      onClick={handleFirstPage}
    >
      <FirstPage />

      <ScreenReaderOnly>Return to First Page</ScreenReaderOnly>
    </Button>
    <Pager>
      <Pager.Previous
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={previousDisabled}
      />
      <Pager.Next onClick={() => handlePageChange(currentPage + 1)} disabled={nextDisabled} />
    </Pager>
    <span className={styles.PageDisplay}>
      Page:{' '}
      <strong className={styles.Bold} data-id="pagination-current-page">
        {currentPage}
      </strong>{' '}
      / {Math.ceil(totalCount / perPage)}
    </span>
  </div>
);
export default CursorPaging;
