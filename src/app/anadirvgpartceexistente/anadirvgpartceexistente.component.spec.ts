import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnadirvgpartceexistenteComponent } from './anadirvgpartceexistente.component';

describe('AnadirvgpartceexistenteComponent', () => {
  let component: AnadirvgpartceexistenteComponent;
  let fixture: ComponentFixture<AnadirvgpartceexistenteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AnadirvgpartceexistenteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnadirvgpartceexistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
