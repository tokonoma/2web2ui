import React from 'react';
import { InsertLink } from '@sparkpost/matchbox-icons';
import { Snippet } from 'react-instantsearch/dom';
import { ExternalLink } from 'src/components/links';
import styles from './AlgoliaResults.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { Box, Stack, Text } from 'src/components/matchbox';

const OGAlgoliaResults = ({ hit }) => (
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
  <Stack>
    <Text fontWeight="normal" as="p" fontSize="400">
      <ExternalLink to={hit.permalink}>{hit.post_title}</ExternalLink>
    </Text>
    <Box mb="500">
      <Snippet tagName="b" attribute="post_excerpt" hit={hit} />
    </Box>
  </Stack>
);
const AlgoliaResults = props => useHibanaToggle(OGAlgoliaResults, HibanaAlgoliaResults)(props);

export default AlgoliaResults;
