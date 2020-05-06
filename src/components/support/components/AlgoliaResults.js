import React from 'react';
import { InsertLink } from '@sparkpost/matchbox-icons';
import { Snippet } from 'react-instantsearch/dom';
import { ExternalLink } from 'src/components/links';
import styles from './AlgoliaResults.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { Box, Stack, Text } from 'src/components/matchbox';

export const OGAlgoliaResults = ({ hit }) => (
  <div className={styles.Result}>
    <strong>
      <InsertLink /> <ExternalLink to={hit.permalink}>{hit.post_title}</ExternalLink>
    </strong>
    <div>
      <Snippet tagName="b" attribute="post_excerpt" hit={hit} />
    </div>
  </div>
);

const HibanaAlgoliaResults = ({ hit }) => (
  <Stack space="100">
    <Text as={ExternalLink} to={hit.permalink} fontWeight="normal" fontSize="200" color="gray.700">
      {hit.post_title}
    </Text>
    <Box mb="500" fontSize="200">
      <Snippet tagName="b" attribute="post_excerpt" hit={hit} />
    </Box>
  </Stack>
);
const AlgoliaResults = props => useHibanaToggle(OGAlgoliaResults, HibanaAlgoliaResults)(props);

export default AlgoliaResults;
