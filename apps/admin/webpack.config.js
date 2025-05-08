const { withModuleFederation } = require('@nx/angular/module-federation');
module.exports = withModuleFederation({
  name: 'admin',
  exposes: {
    './Module': './apps/admin/src/app/remote-entry/entry.module.ts',
  },
  shared: (sharedConfig) => ({
    ...sharedConfig,
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    '@angular/platform-browser/animations': { singleton: true, strictVersion: true, requiredVersion: '~19.2.0' },
    'ngx-toastr': { singleton: true, strictVersion: true, requiredVersion: '^19.0.0' },
    '@poc-angular-mfe/shared': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  })
});