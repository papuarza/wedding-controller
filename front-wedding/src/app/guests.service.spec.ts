/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GuestsService } from './guests.service';

describe('GuestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestsService]
    });
  });

  it('should ...', inject([GuestsService], (service: GuestsService) => {
    expect(service).toBeTruthy();
  }));
});
