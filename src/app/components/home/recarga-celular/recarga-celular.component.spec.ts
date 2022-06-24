import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecargaCelularComponent } from './recarga-celular.component';

describe('RecargaCelularComponent', () => {
  let component: RecargaCelularComponent;
  let fixture: ComponentFixture<RecargaCelularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecargaCelularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecargaCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
