import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModificarcajaComponent } from './modificarcaja.component';

describe('ModificarcajaComponent', () => {
  let component: ModificarcajaComponent;
  let fixture: ComponentFixture<ModificarcajaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModificarcajaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarcajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
