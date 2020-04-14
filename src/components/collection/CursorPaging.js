import styles from './CursorPaging.module.scss';
import { FirstPage } from '@sparkpost/matchbox-icons';
import React from 'react';
import { Box, Button, Pager, ScreenReaderOnly, Text } from 'src/components/matchbox';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

export const OGCursorPaging = ({
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

export const HibanaCursorPaging = ({
  currentPage,
  handlePageChange,
  previousDisabled,
  nextDisabled,
  handleFirstPage,
  perPage,
  totalCount,
}) => (
  <Box display="flex" alignItems="center">
    <Button flat disabled={currentPage === 1} key="rewind" onClick={handleFirstPage}>
      <FirstPage />
      <ScreenReaderOnly>Return to First Page</ScreenReaderOnly>
    </Button>
    <Pager>
      <Pager.Previous
        flat
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={previousDisabled}
      />
      <Pager.Next flat onClick={() => handlePageChange(currentPage + 1)} disabled={nextDisabled} />
    </Pager>
    <Text marginLeft="200" as="span" fontSize="200">
      Page:&nbsp;
      <strong data-id="pagination-current-page">{currentPage}</strong>
      &nbsp;of {Math.ceil(totalCount / perPage)}
    </Text>
  </Box>
);

export const CursorPaging = props => {
  return useHibanaToggle(OGCursorPaging, HibanaCursorPaging)(props);
};

export default CursorPaging;
