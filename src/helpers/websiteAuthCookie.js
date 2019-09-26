import cookie from 'js-cookie';
import config from 'src/config';

const websiteAuthCookie = config.authentication.site.cookie;
const { tenantId } = config; // Note: Could actually be tenant alias since its taken from hostname

function save(data) {
  cookie.set(websiteAuthCookie.name, { ...data, tenant: tenantId }, websiteAuthCookie.options);
}

function remove() {
  cookie.remove(websiteAuthCookie.name, websiteAuthCookie.options);
}

export default { save, remove };
