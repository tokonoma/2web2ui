import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import getConfig from 'src/helpers/getConfig';
import useRouter from 'src/hooks/useRouter';

const api = axios.create({
  baseURL: 'https://drbgqnye23.execute-api.us-east-1.amazonaws.com/tst',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const Timestream = props => {
  const {
    location: { pathname },
  } = useRouter();

  React.useEffect(() => {
    api.post('/activity', {
      tenant_id: getConfig('tenantId'),
      customer_id: props.account.customer_id,

      // see, selectors/currentUser.js usernameSelector
      user_id: props.currentUser.username || props.tfa.username || props.auth.username,

      // todo,
      // ip: "1.2.3.18",

      service: 'Metrics',
      origin: 'ui',
      type: 'pageview',
      detail: pathname,

      // extra
      // release: getConfig('release')
      // isTestAccount: props.currentUser.email looks like (messagesystems|parkpost).com
    });
  }, [
    pathname,
    props.account.customer_id,
    props.auth.username,
    props.currentUser.username,
    props.tfa.username,
  ]);

  return null;
};

export default connect(state => state)(Timestream);
