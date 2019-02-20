import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import { Link } from 'react-router-dom';


export const SubaccountPanel = ({
  subaccount
}) => <Panel
  title="Subaccount Information"
  actions={[
    {
      color: 'orange',
      component: Link,
      content: 'Subaccount Page',
      to: `/account/subaccounts/${subaccount.id}`
    }
  ]}
>
  <Panel.Section>
    <LabelledValue label="Name">
      {subaccount.name}
    </LabelledValue>
    <LabelledValue label="ID">
      {subaccount.id}
    </LabelledValue>
  </Panel.Section>
</Panel>;

export default SubaccountPanel;
