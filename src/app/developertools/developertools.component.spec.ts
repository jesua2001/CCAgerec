import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DevelopertoolsComponent } from './developertools.component';

describe('DevelopertoolsComponent', () => {
  let component: DevelopertoolsComponent;
  let fixture: ComponentFixture<DevelopertoolsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DevelopertoolsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DevelopertoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
