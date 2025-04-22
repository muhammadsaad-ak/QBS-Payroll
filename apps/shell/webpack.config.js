const { withModuleFederation } = require('@nx/angular/module-federation');

module.exports = withModuleFederation({
  name: 'shell',
  remotes: ['admin'], // points to apps/admin
  shared: {
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    '@angular/router': { singleton: true, strictVersion: true }
  }
});
