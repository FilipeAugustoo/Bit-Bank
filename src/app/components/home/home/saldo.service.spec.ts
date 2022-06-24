import { TestBed } from '@angular/core/testing';

import { SaldoService } from '../home/saldo.service';

describe('SaldoService', () => {
  let service: SaldoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaldoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
