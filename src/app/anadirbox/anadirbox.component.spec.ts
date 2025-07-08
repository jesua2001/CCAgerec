import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnadirboxComponent } from './anadirbox.component';

describe('AnadirboxComponent', () => {
  let component: AnadirboxComponent;
  let fixture: ComponentFixture<AnadirboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AnadirboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnadirboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
