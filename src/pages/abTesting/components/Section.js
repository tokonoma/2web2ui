import React from 'react';
import { Box, Grid, Text } from 'src/components/matchbox';
import { OGOnlyWrapper } from 'src/components/hibana';
import OGStyles from './Section.module.scss';
import HibanaStyles from './SectionHibana.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import className from 'classnames';
const Left = ({ children }) => (
  <OGOnlyWrapper as={Grid.Column} xs={12} lg={5}>
    <Box as={Grid.Column} xs={12} lg={3}>
      <div>{children}</div>
    </Box>
  </OGOnlyWrapper>
);

const Right = ({ children, variant }) => {
  const styles = useHibanaOverride(OGStyles, HibanaStyles);
  return (
    <OGOnlyWrapper as={Grid.Column} xs={12} lg={7}>
      <Box as={Grid.Column} xs={12} lg={9}>
        <div className={className(variant === 'viewmode' ? styles.RightViewMode : styles.Right)}>
          {children}
        </div>
      </Box>
    </OGOnlyWrapper>
  );
};

export function OGSection(props) {
  const { title, children } = props;
  return (
    <div>
      <hr />
      <h3>{title}</h3>
      <Grid>{children}</Grid>
    </div>
  );
}

function HibanaSection(props) {
  const { title, children } = props;

  return (
    <div>
      <Text as="span" fontSize="400" fontWeight="600" role="heading" aria-level="3" mb="200">
        {title}
      </Text>
      <Grid>{children}</Grid>
    </div>
  );
}

function Section(props) {
  return useHibanaToggle(OGSection, HibanaSection)(props);
}
Section.Left = Left;
Section.Right = Right;

export default Section;
