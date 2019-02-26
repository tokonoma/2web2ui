# Phoenix UI Configuration

## Using Config In Code

```js
import config from 'src/config'
```

The configuration module under `src/config/` merges variables from these locations:

 - `src/config/default.js`
 - `src/config/env/dev-config.js`  
 - `src/config/env/prod-config.js` - Current tenant's config from all configs that are included in the bundle
 - `src/config/env/test-config.js`

`src/config/index.js` merges current tenant configuration with default config on `production` model. For `test` or `development` mode, it uses `test-config` and `dev-config` respectively and merges with defaults.    

## Default Configuration

Any variables you'd like to use across all environments and tenants go in `src/config/default.js`. Please note, any of the default values can be overriden in environment files under `src/config/env`. 

## Per-Environment Overrides

### Test Environment
Test config is active during `npm run test`

Put test-time values in `src/config/env/test-config.js`.


## Tenant Configurations

Our build process generates all tenant configs and includes in the bundle. At runtime, corresponding tenant config is used based on hostname.  


All the magic happens in `scripts/generateConfigs`. The following are the maps used to generate the tenant configuration scripts.

- `tenants/<environment>.js` - tenant configurations, environment dictates which environment configuration to merge with
- `environments/<environment>.js` - environment configurations
- `defaultTemplate.js` - defaults for all tenants

Please note that `constructContent.js` ignores (by deconstructing) some configuration value that are only used during generation.

### Local Development

In `development` mode, configuration is loaded from `src/config/env/dev-config.js` regardless of hostname (tenant).  


## Global Variable
The final configurations are exposed in a global variable which can be accessed using `SP.productionConfig`. This is used in `index.html` to use correct project ID for sentry.
 
### Manual Test

To manually test generated tenant configurations, run `npm run build`. To verify if correct config is loaded, you can inspect logging in `sr/config/env/prod-config.js`. Also you can inspect `window.SP.productionConfig` in browser console.  
