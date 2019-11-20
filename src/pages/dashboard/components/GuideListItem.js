import React from 'react';
import ButtonWrapper from 'src/components/buttonWrapper';
import { PanoramaFishEye, CheckCircleOutline } from '@sparkpost/matchbox-icons';
import { Button } from '@sparkpost/matchbox';

export const GuideListItem = ({ itemCompleted, children, action: { name, onClick }}) => (
  <div>
    <div>
      {itemCompleted ? <CheckCircleOutline size={50}/> : <PanoramaFishEye size={10}/>}
    </div>
    <div>
      {children}
    </div>
    <ButtonWrapper>
      <Button onClick={onClick} color={!itemCompleted && 'orange'}> {name} </Button>
    </ButtonWrapper>
  </div>
);

export const GuideListItemTitle = ({ children }) => (
  <div>
    {children}
  </div>
);

export const GuideListItemDescription = ({ children }) => (
  <div>
    {children}
  </div>
);
