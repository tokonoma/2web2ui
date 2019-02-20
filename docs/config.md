# Phoenix UI Configuration

## Using Config In Code

```js
import config from 'src/config'
```

The configuration module under `src/config/` merges variables from these locations in order:

 - `src/config/default.js`
 - `SP.productionConfig` from the current tenant's config file for development (see below)
 - Current tenant's config from all configs that are included in the bundle
 - `src/config/test-config.js` if NODE_ENV==='test'

## Default Configuration

Any variables you'd like to use across all environments and tenants go in `src/config/default.js`.

## Per-Environment Overrides

### Test Environment
Test config is active during `npm run test`

Put test-time values in `src/config/test-config.js`.


## Tenant Configurations

Our build process generates all tenant configs and includes in the bundle. At runtime, corresponding tenant config is used based on hostname.  

For local development, a conditional script element is used in index.html. It loads config from public/static/tenant-config/production.js and exposes a global variable called SP.productionConfig. At runtime, if is used if exist. See `src/config/index.js` for implementation. 


## Configuration

All the magic happens in `scripts/generateConfigs`.  The following are the maps used to generate the tenant configuration scripts.

- `tenants/<environment>.js` - tenant configurations, environment dictates which environment configuration to merge with
- `environments/<environment>.js` - environment configurations
- `defaultTemplate.js` - defaults for all tenants

Please note that `constructContent.js` ignores (by deconstructing) some configuration value that are only used during generation.


### Local Development

Since there is no build, there are no tenant configuration scripts.  Therefore, `public/static/tenant-config/production.js` is used.


### Manual Test

To manually test generated tenant configurations, run `npm run build` and confirm the tenant configuration, `build/public/static/tenant-config/<host>/production.js`, looks as you expect.
