import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomevgpartComponent } from './homevgpart.component';

describe('HomevgpartComponent', () => {
  let component: HomevgpartComponent;
  let fixture: ComponentFixture<HomevgpartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomevgpartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomevgpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
