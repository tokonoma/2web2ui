import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Panel, UnstyledLink, TextField, Button, Icon } from '@sparkpost/matchbox';
import { CenteredLogo } from 'src/components';
import Steps from './components/Steps';
import { LINKS } from 'src/constants';

import styles from './Onboarding.module.scss';

class SendingDomainPage extends Component {
  render() {
    return (
      <Fragment>
        <CenteredLogo />
        <Panel accent title='Welcome to SparkPost!'>
          <Panel.Section>
            <p>Let's get you set up to send some email!</p>

            <p>Which domain will you be sending from? <UnstyledLink to={LINKS.ONBOARDING_SENDING} external>Learn more about sending domains</UnstyledLink>.</p>

            <TextField label='Domain'/>
          </Panel.Section>
          <Panel.Section>
            <Button primary>Add Domain</Button>
            <UnstyledLink
              to='/super-hidden-route/email'
              Component={Link}
              className={styles.SkipLink}>
                Skip for now <Icon name='ArrowRight'/>
            </UnstyledLink>
          </Panel.Section>
          <Steps />
        </Panel>
      </Fragment>
    );
  }
}

export default SendingDomainPage;
