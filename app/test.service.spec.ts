import {provide} from 'angular2/core';
import {describe, beforeEachProviders, it, inject, expect} from 'angular2/testing';
import {TestService} from './test.service';

export function main() {
    class MockTestService extends TestService {
        public name: string = 'Mocked Service';
    }

    describe('TestService', () => {
        beforeEachProviders(() => [
            provide(TestService, {useClass: MockTestService})
        ]);

        it('should have name property set', inject([TestService], (testService: TestService) => {
            expect(testService.name).toBe('Mocked Service');
        }));
    });
}
