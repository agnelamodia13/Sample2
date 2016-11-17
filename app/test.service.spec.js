System.register(['angular2/core', 'angular2/testing', './test.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var core_1, testing_1, test_service_1;
    function main() {
        var MockTestService = (function (_super) {
            __extends(MockTestService, _super);
            function MockTestService() {
                _super.apply(this, arguments);
                this.name = 'Mocked Service';
            }
            return MockTestService;
        }(test_service_1.TestService));
        testing_1.describe('TestService', function () {
            testing_1.beforeEachProviders(function () { return [
                core_1.provide(test_service_1.TestService, { useClass: MockTestService })
            ]; });
            testing_1.it('should have name property set', testing_1.inject([test_service_1.TestService], function (testService) {
                testing_1.expect(testService.name).toBe('Mocked Service');
            }));
        });
    }
    exports_1("main", main);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (test_service_1_1) {
                test_service_1 = test_service_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=test.service.spec.js.map