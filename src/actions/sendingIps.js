import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export function updateSendingIp(id, ipPoolId) {
  return sparkpostApiRequest({
    type: 'UPDATE_SENDING_IP',
    meta: {
      method: 'PUT',
      url: `/v1/sending-ips/${id}`,
      data: { ip_pool: ipPoolId }
    }
  });
}

export function list() {
  return sparkpostApiRequest({
    type: 'LIST_SENDING_IPS',
    meta: {
      method: 'GET',
      url: '/v1/sending-ips'
    }
  });
}
