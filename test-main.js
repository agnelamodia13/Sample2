// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

/**
 * Cancel Karma's synchronous start, we will call `__karma__.start()` later, once all the specs are loaded.
 */
__karma__.loaded = function () {
};

System.config({
    baseURL: '/base/',
    defaultJSExtensions: true,
    paths: {
        'angular2/*': 'node_modules/angular2/*.js',
        'rxjs/*': 'node_modules/rxjs/*.js'
    },
    // a bug with karma-coverage and system.js
    meta: {
        'app/*': {
            format: 'register'
        }
    }
});

Promise.all([
    System.import('angular2/src/platform/browser/browser_adapter'),
    System.import('angular2/platform/testing/browser'),
    System.import('angular2/testing')
]).then(function (modules) {
    var browser_adapter = modules[0];
    var providers = modules[1];
    var testing = modules[2];
    testing.setBaseTestProviders(providers.TEST_BROWSER_PLATFORM_PROVIDERS,
        providers.TEST_BROWSER_APPLICATION_PROVIDERS);

    browser_adapter.BrowserDomAdapter.makeCurrent();
}).then(function () {
        return Promise.all(
            Object.keys(window.__karma__.files) // All files served by Karma.
                .filter(onlySpecFiles)
                .map(file2moduleName)
                .map(function (path) {
                    return System.import(path).then(function (module) {
                        if (module.hasOwnProperty('main')) {
                            module.main();
                        } else {
                            throw new Error('Module ' + path + ' does not implement main() method.');
                        }
                    });
                }));
    })
    .then(function () {
        __karma__.start();
    }, function (error) {
        console.error(error.stack || error);
        __karma__.start();
    });

// filter test files
function onlySpecFiles(path) {
    return /spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
    return filePath.replace(/\\/g, '/')
        .replace(/.*\/modules\//, '')
        .replace(/.*\/dist\/js\/dev\/es5\//, '')
        .replace(/\/web\//, '/')
        .replace(/\/lib\//, '/')
        .replace(/\.\w*$/, '');
}