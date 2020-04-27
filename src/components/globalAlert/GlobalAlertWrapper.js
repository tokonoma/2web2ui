import React from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { clear } from 'src/actions/globalAlert';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { Portal } from 'src/components/matchbox';
import Animator from './Animator';
import Alert from './Alert';
import OGStyles from './GlobalAlert.module.scss';
import hibanaStyles from './GlobalAlertHibana.module.scss';

export const GlobalAlertWrapper = ({ alerts, clear }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Portal containerId="alert-portal">
      <div className={styles.Wrapper}>
        <TransitionGroup>
          {alerts.map(alert => (
            <Animator key={alert.id}>
              <div className={styles.Alert}>
                <Alert onDismiss={() => clear(alert.id)} {...alert} />
              </div>
            </Animator>
          ))}
        </TransitionGroup>
      </div>
    </Portal>
  );
};

const mapStateToProps = ({ globalAlert }) => ({ ...globalAlert });
export default connect(mapStateToProps, { clear })(GlobalAlertWrapper);
