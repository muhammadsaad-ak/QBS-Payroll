const { withModuleFederation } = require('@nx/angular/module-federation');

module.exports = withModuleFederation({
  name: 'shell',
  remotes: {
    admin: 'admin@http://localhost:4202/remoteEntry.js' // Define remote name and URL for development
  },
  shared: {
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    '@angular/router': { singleton: true, strictVersion: true },
    '@angular/common/http': { singleton: true }
  }
});