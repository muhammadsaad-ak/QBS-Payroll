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
    "@angular/router": { singleton: true, strictVersion: true }
  })
});