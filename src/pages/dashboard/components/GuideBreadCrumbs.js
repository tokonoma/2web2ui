import React from 'react';
import { BREADCRUMB_ITEMS } from '../constants';
import { BreadCrumbs, BreadCrumbsItem } from 'src/components';
import { useGuideContext } from './GettingStartedGuide';

export default function GuideBreadCrumbs() {
  const { stepName, setAndStoreStepName } = useGuideContext();
  return (
    <BreadCrumbs>
      {BREADCRUMB_ITEMS[stepName].map(item => (
        <BreadCrumbsItem
          key={item}
          onClick={() => setAndStoreStepName(item)}
          active={stepName === item}
        >
          {item}
        </BreadCrumbsItem>
      ))}
    </BreadCrumbs>
  );
}
