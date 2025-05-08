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
    '@angular/common/http': { singleton: true }, 
    '@angular/platform-browser/animations': { singleton: true, strictVersion: true, requiredVersion: '~19.2.0' },
    'ngx-toastr': { singleton: true, strictVersion: true, requiredVersion: '^19.0.0' },
    '@poc-angular-mfe/shared': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  }
});