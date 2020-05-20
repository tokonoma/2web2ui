import React from 'react';
import { Button } from 'src/components/matchbox';
import { useFeatureChangeContext } from '../context/FeatureChangeContext';

const SubmitSection = ({ loading }) => {
  const { loading: featureSectionLoading } = useFeatureChangeContext();
  if (featureSectionLoading) {
    return null;
  }

  return (
    <Button type="submit" disabled={loading} variant="primary">
      Change Plan
    </Button>
  );
};

export default SubmitSection;
