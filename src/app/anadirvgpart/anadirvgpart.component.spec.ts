import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnadirvgpartComponent } from './anadirvgpart.component';

describe('AnadirvgpartComponent', () => {
  let component: AnadirvgpartComponent;
  let fixture: ComponentFixture<AnadirvgpartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AnadirvgpartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnadirvgpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
