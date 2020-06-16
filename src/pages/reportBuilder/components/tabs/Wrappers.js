import { Box, Table, Text } from 'src/components/matchbox';
import styles from './Wrappers.module.scss';
import React from 'react';
import { Empty, Loading } from 'src/components';

export const FilterBoxWrapper = props => (
  <>
    <Box padding="500">
      <Text as="div" fontSize="400" fontWeight="600">
        Filter
      </Text>
      {props}
    </Box>
    <hr className={styles.Line} />
  </>
);

export const TableWrapper = props => (
  <>
    <Table>{props.children}</Table>
    <hr className={styles.Line} />
  </>
);

export const EmptyWrapper = ({ message }) => (
  <Box height={'200px'} paddingTop={'70px'}>
    <Empty message={message} hasPanel={false} />
  </Box>
);

export const LoadingWrapper = () => (
  <Box position={'relative'}>
    <Loading />
  </Box>
);
