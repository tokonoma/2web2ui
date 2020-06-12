import React, { createContext, useContext } from 'react';
import { connect } from 'react-redux';
import { updateUserUIOptions } from 'src/actions/currentUser';
import { showAlert } from 'src/actions/globalAlert';
import { isUserUiOptionSet } from 'src/helpers/conditions/user';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { selectCondition } from 'src/selectors/accessConditionState';

const HibanaStateContext = createContext();

function Provider(props) {
  const { isHibanaEnabled: _isHibanaEnabled, children, ...rest } = props;

  // TODO: When OG theme is removed, the env variables will no longer be necessary
  const isHibanaEnabled =
    process.env.REACT_APP_DEFAULT_TO_HIBANA === 'true' ? true : _isHibanaEnabled;

  return (
    <HibanaStateContext.Provider value={{ isHibanaEnabled, ...rest }}>
      {children}
    </HibanaStateContext.Provider>
  );
}

function mapStateToProps(state) {
  return {
    isHibanaEnabled: selectCondition(isUserUiOptionSet('isHibanaEnabled'))(state),
    isBannerVisible: selectCondition(isUserUiOptionSet('isHibanaBannerVisible'))(state),
    hasThemeControls: selectCondition(isAccountUiOptionSet('hibana.hasThemeControls'))(state),
  };
}

const mapDispatchToProps = {
  dismissBanner: () => updateUserUIOptions({ isHibanaBannerVisible: false }),
  setIsHibanaEnabled: bool => {
    if (window.pendo && window.pendo.track) {
      window.pendo.track(`Hibana Toggle - ${Boolean(bool) ? 'On' : 'Off'}`);
    }

    // Always dismiss the banner when the user toggles their theme
    return updateUserUIOptions({ isHibanaEnabled: bool, isHibanaBannerVisible: false });
  },
  showAlert,
};

export function useHibana() {
  const context = useContext(HibanaStateContext);

  if (context === undefined) throw new Error('useHibana must be used within a HibanaProvider');

  return [context];
}

export const HibanaProvider = connect(mapStateToProps, mapDispatchToProps)(Provider);

export function HibanaConsumer({ children }) {
  return <HibanaStateContext.Consumer>{children}</HibanaStateContext.Consumer>;
}
