import React from 'react';
import { InsertLink } from '@sparkpost/matchbox-icons';
import { Snippet } from 'react-instantsearch/dom';
import { ExternalLink } from 'src/components/links';
import styles from './AlgoliaResults.module.scss';

const AlgoliaResults = ({ hit }) => (
  <div className={styles.Result}>
    <strong>
      <InsertLink /> <ExternalLink to={hit.permalink}>{hit.post_title}</ExternalLink>
    </strong>
    <div>
      <Snippet tagName="b" attribute="post_excerpt" hit={hit} />
    </div>
  </div>
);

export default AlgoliaResults;
