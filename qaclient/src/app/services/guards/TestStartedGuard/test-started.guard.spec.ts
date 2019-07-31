import { TestBed, async, inject } from '@angular/core/testing';

import { TestStartedGuard } from './test-started.guard';

describe('TestStartedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestStartedGuard]
    });
  });

  it('should ...', inject([TestStartedGuard], (guard: TestStartedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
