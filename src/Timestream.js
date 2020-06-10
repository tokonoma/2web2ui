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

class Client {
  events = [];
  isReady = false;

  post() {
    while (this.events.length) {
      const event = this.events.pop();

      api.post('/activity', {
        ...this.identity,
        ...event,
      });
    }
  }

  report(event) {
    this.events.push(event);

    if (this.identity) {
      this.post();
    }
  }

  setIdentity(identity) {
    this.identity = identity;
    this.post();
  }
}

const client = new Client();

const Timestream = props => {
  const {
    location: { pathname },
  } = useRouter();

  // repot pageviews
  React.useEffect(() => {
    client.report({
      // todo,
      // ip: "1.2.3.18",

      service: 'Metrics',
      origin: 'ui',
      type: 'pageview',
      detail: pathname,

      //   // extra
      //   // release: getConfig('release')
      //   // isTestAccount: props.currentUser.email looks like (messagesystems|parkpost).com
      //   return state;
      // };
    });
  }, [pathname]);

  // report clicks

  // set account information
  React.useEffect(() => {
    const identity = {
      tenant_id: getConfig('tenantId'),
      customer_id: props.account.customer_id,
      // see, selectors/currentUser.js usernameSelector
      user_id: props.currentUser.username || props.tfa.username,
    };

    if (identity.tenant_id && identity.customer_id && identity.user_id) {
      client.setIdentity(identity);
    }
  }, [
    props.account.customer_id,
    props.currentUser.username,
    props.tfa.username,
    props.auth.username,
  ]);

  return null;
};

export default connect(state => state)(Timestream);
