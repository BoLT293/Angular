import { TestBed } from '@angular/core/testing';

import { HttpmessageService } from './httpmessage.service';

describe('HttpmessageService', () => {
  let service: HttpmessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpmessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
