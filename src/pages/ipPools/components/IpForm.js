import React, { useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, formValueSelector, getFormValues, reduxForm, submit } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Button, Panel, Label } from '@sparkpost/matchbox';
import { SelectWrapper, RadioGroup } from 'src/components/reduxFormWrappers';
import { ConfirmationModal } from 'src/components';
import { Card, CardTitle, CardContent } from 'src/components/card';
import ExternalLink from 'src/components/externalLink';
import ButtonWrapper from 'src/components/buttonWrapper';
import {
  getIpPools,
  selectCurrentPool,
  selectIpForCurrentPool,
  selectIpFormInitialValues,
} from 'src/selectors/ipPools';
import { IP_WARMUP_STAGES } from '../constants';
import styles from './IpForm.module.scss';

const formName = 'ipForm';

export const IpForm = props => {
  const {
    ip,
    pool,
    pools,
    isAutoWarmupEnabled,
    handleSubmit,
    submit,
    submitting,
    pristine,
  } = props;
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const reAssignPoolsOptions = pools.map(currentPool => ({
    value: currentPool.id,
    label:
      currentPool.id === pool.id
        ? '-- Select a new pool --'
        : `${currentPool.name} (${currentPool.id})`,
  }));

  const stageOptions = IP_WARMUP_STAGES.map(stage => ({
    label: `${stage.name} (Volume: ${stage.volume})`,
    value: stage.id,
    disabled: stage.id > (ip.auto_warmup_stage || 1),
  }));

  const handleConfirmClick = () => {
    setConfirmationModalOpen(false);
    submit(formName);
  };

  const handleUpdateSendingIPClick = () => {
    const isEnabling = isAutoWarmupEnabled && !ip.auto_warmup_enabled;
    const isDisabling = !isAutoWarmupEnabled && ip.auto_warmup_enabled;

    if (isEnabling || isDisabling) {
      setConfirmationModalOpen(true);

      return false;
    }

    return submit(formName);
  };

  return (
    <Panel title="Sending IP Details">
      <form onSubmit={handleSubmit}>
        <Panel.Section>
          <div className={styles.FieldGroup}>
            {/* NOTE: This should not be using the HTML <label> element - just a <div> with the same styles. This is a limitation of the existing component */}
            <Label>Hostname</Label>

            <p>{ip.hostname}</p>
          </div>

          <div className={classNames(styles.MaxWidthSM, styles.FieldGroup)}>
            <Label id="ip_pool">Reassign IP Pool</Label>

            <Field
              name="ip_pool"
              component={SelectWrapper}
              options={reAssignPoolsOptions}
              disabled={submitting}
            />
          </div>

          <fieldset className={styles.RadioGroup}>
            {/* NOTE: This *should* be a `<legend>` inside of a `<fieldset>` */}
            <Label>Auto IP Warmup</Label>

            <Field
              name="auto_warmup_enabled"
              component={RadioGroup}
              type="radio"
              parse={val => (val === 'true' ? true : false)}
              value={isAutoWarmupEnabled ? 'true' : 'false'}
              options={[
                {
                  label: <strong>Auto IP Warmup</strong>,
                  value: 'true',
                  helpText: (
                    <div className={styles.MaxWidthMD}>
                      <p className={styles.RadioParagraph}>
                        Standard warmup involves gradually increasing the amount of traffic to the
                        gold IP each day based on a pre-determined schedule. Traffic exceeding the
                        daily limit will be directed to other IPs in the same pool and then to the
                        overflow pool you designate.
                      </p>

                      <div className={styles.WarmupDocLink}>
                        <ExternalLink to="https://www.sparkpost.com/docs/user-guide/automated-ip-warmup/">
                          Warmup Documentation
                        </ExternalLink>
                      </div>
                    </div>
                  ),
                },
                {
                  label: <strong>Do Not Throttle for Warmup</strong>,
                  value: 'false',
                  helpText: (
                    <p className={classNames(styles.RadioParagraph, styles.MaxWidthMD)}>
                      This IP will not be throttled for the purposes of IP warmup. Use this option
                      if your IP is already warm or if you're planning to use your own warmup
                      methods.
                    </p>
                  ),
                },
              ]}
              disabled={submitting}
            />
          </fieldset>

          {/* eslint-disable no-restricted-syntax */}
          <div className={classNames(styles.MaxWidthMD, styles.Card)}>
            <Card>
              <CardTitle>Engagement Based IP Warmup</CardTitle>

              <CardContent>
                <p className={styles.CardParagraph}>
                  This feature exists for accounts with a{' '}
                  <abbr title="Customer Success Manager">CSM</abbr> or dedicated{' '}
                  <abbr title="Technical Account Manager">TAM</abbr>. We will automatically bind
                  highly engaged traffic to your cold IP to give it the best chance of warming up.
                </p>
              </CardContent>
            </Card>
          </div>
          {/* eslint-enable no-restricted-syntax */}

          {isAutoWarmupEnabled && (
            <div className={classNames(styles.MaxWidthSM, styles.FieldGroup)}>
              <Field
                label="Warmup Stage"
                name="auto_warmup_stage"
                component={SelectWrapper}
                options={stageOptions}
                parse={_.toInteger}
                helpText="You can select a previous stage but can not select an advanced stage."
                disabled={submitting}
              />
            </div>
          )}
        </Panel.Section>

        <Panel.Section>
          <ButtonWrapper>
            <Button primary disabled={submitting || pristine} onClick={handleUpdateSendingIPClick}>
              {submitting ? 'Saving' : 'Update Sending IP'}
            </Button>
          </ButtonWrapper>
        </Panel.Section>
      </form>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title={`Are you sure you want to ${
          isAutoWarmupEnabled ? 'enable' : 'disable'
        } Auto IP Warmup?`}
        content={
          isAutoWarmupEnabled ? (
            <p>
              Enabling Auto IP Warmup will limit the amount of traffic that you can send over this
              IP based on the warmup stage. Remaining traffic will be distributed amongst other IPs
              in the same pool or the designated overflow pool.
            </p>
          ) : (
            <p>
              Disabling Auto IP Warmup will remove the volume restrictions from this IP. If this IP
              is not properly warmed, this can have negative consequences on your deliverability and
              sender reputation.
            </p>
          )
        }
        onCancel={() => setConfirmationModalOpen(false)}
        onConfirm={handleConfirmClick}
        confirmVerb={
          isAutoWarmupEnabled
            ? 'Yes, I want to turn ON Auto IP Warmup'
            : 'Yes, I want to turn OFF Auto IP Warmup'
        }
      />
    </Panel>
  );
};

const valueSelector = formValueSelector(formName);
const mapStateToProps = (state, props) => ({
  pool: selectCurrentPool(state, props),
  ip: selectIpForCurrentPool(state, props),
  pools: getIpPools(state, props),
  initialValues: selectIpFormInitialValues(state, props),
  isAutoWarmupEnabled: valueSelector(state, 'auto_warmup_enabled'),
  formValues: getFormValues(formName)(state),
});

const formOptions = {
  form: formName,
  enableReinitialize: true,
};

const connectedForm = withRouter(
  connect(mapStateToProps, { submit })(reduxForm(formOptions)(IpForm)),
);
connectedForm.displayName = 'IpForm';
export default connectedForm;
