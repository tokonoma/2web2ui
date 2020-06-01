import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'src/components/matchbox';
import {
  getAccountSingleSignOnDetails,
  updateAccountSingleSignOn,
} from 'src/actions/accountSingleSignOn';
import { ExternalLink } from 'src/components/links';
import { PanelLoading } from 'src/components/loading';
import { LINKS } from 'src/constants';
import ProviderSection from './ProviderSection';
import StatusSection from './StatusSection';
import SCIMTokenSection from './SCIMTokenSection';
import { PANEL_LOADING_HEIGHT } from 'src/pages/account/constants';

export function SingleSignOnPanel(props) {
  const { getAccountSingleSignOnDetails, provider, tfaRequired } = props;
  useEffect(() => getAccountSingleSignOnDetails(), [getAccountSingleSignOnDetails]);

  const renderContent = () => {
    return (
      <React.Fragment>
        {tfaRequired && (
          <p>
            Single sign-on is not available while two-factor authentication is required on this
            account.
          </p>
        )}
        <ProviderSection readOnly={tfaRequired} provider={provider} />
        <StatusSection readOnly={tfaRequired} {...props} />
        <SCIMTokenSection {...props} />
      </React.Fragment>
    );
  };

  const { loading } = props;

  if (loading) {
    return <PanelLoading minHeight={PANEL_LOADING_HEIGHT} />;
  }

  return (
    <Panel
      title="Single Sign-On"
      actions={[
        {
          color: 'orange',
          component: ExternalLink,
          content: 'Learn More',
          to: LINKS.SSO_GUIDE,
        },
      ]}
    >
      {renderContent()}
    </Panel>
  );
}

const mapDispatchToProps = {
  getAccountSingleSignOnDetails,
  updateAccountSingleSignOn,
};

const mapStateToProps = ({ account, accountSingleSignOn }) => ({
  ...accountSingleSignOn,
  tfaRequired: account.tfa_required,
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSignOnPanel);
