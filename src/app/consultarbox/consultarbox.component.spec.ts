import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsultarboxComponent } from './consultarbox.component';

describe('ConsultarboxComponent', () => {
  let component: ConsultarboxComponent;
  let fixture: ComponentFixture<ConsultarboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConsultarboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
