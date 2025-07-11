import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeaplicationComponent } from './changeaplication.component';

describe('ChangeaplicationComponent', () => {
  let component: ChangeaplicationComponent;
  let fixture: ComponentFixture<ChangeaplicationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ChangeaplicationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeaplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
