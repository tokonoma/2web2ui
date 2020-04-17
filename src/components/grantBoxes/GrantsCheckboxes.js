import classnames from 'classnames/bind';
import React from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import { Box, Grid, Tooltip } from 'src/components/matchbox';
import { CheckboxWrapper } from 'src/components/reduxFormWrappers';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './GrantsCheckboxes.module.scss';
import hibanaStyles from './GrantsCheckboxesHibana.module.scss';

const GrantsCheckboxes = ({ grants, show, disabled }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const cx = classnames.bind(styles);

  const grantFields = _.map(grants, grant => (
    <div className={styles.Grant} key={grant.key}>
      <Tooltip dark content={grant.description}>
        <Field
          name={`grants[${grant.key}]`}
          label={grant.label}
          component={CheckboxWrapper}
          type="checkbox"
          disabled={disabled}
        />
      </Tooltip>
    </div>
  ));

  const grantFieldChunks = _.chunk(grantFields, Math.ceil(_.size(grants) / 3));

  const grantCols = _.map(grantFieldChunks, (grantFields, i) => (
    <Grid.Column xs={12} md={4} key={i}>
      <Box mr={'400'} mt={'100'}>
        {grantFields}
      </Box>
    </Grid.Column>
  ));

  const gridClasses = cx('Grants', { show });

  return <Grid className={gridClasses}>{grantCols}</Grid>;
};

export default GrantsCheckboxes;
