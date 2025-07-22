import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent, IonInput, IonItem, IonLabel, IonText
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { BoxService } from "../core/servicies/box.service";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-modificarcaja',
  standalone: true,
  templateUrl: './modificarcaja.component.html', // Aquí va la ruta al HTML
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonText,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    HeaderComponent
  ]
})
export class ModificarcajaComponent {
  mensaje: string = '';
  error: string = '';
  caja: any = null;
  Nserie?: string;

  constructor(private cajaService: BoxService) {}

  ngOnInit(): void {}

  buscarCaja(): void {
    if (!this.Nserie) {
      this.error = 'Por favor, introduce un certificado';
      this.caja = null;
      return;
    }

    this.cajaService.buscarCajaPorCertificado(this.Nserie).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.caja = { ...res[0] };
          this.error = '';
          this.mensaje = '';
        } else {
          this.error = 'Caja no encontrada';
          this.caja = null;
        }
      },
      error: (err) => {
        console.error("Error al buscar la caja:", err);
        this.error = 'Error al buscar la caja';
        this.caja = null;
      }
    });
  }

  modificarCaja(): void {
    if (!this.caja) {
      this.error = 'No hay caja para modificar';
      return;
    }

    this.cajaService.modificarCaja(this.caja).subscribe({
      next: () => {
        this.mensaje = 'Caja modificada correctamente';
        this.error = '';
      },
      error: (err) => {
        console.error('Error al modificar:', err);
        this.error = 'Error al modificar la caja';
        this.mensaje = '';
      }
    });
  }

  isNumber(value: any): boolean {
    return !isNaN(value) && typeof value !== 'boolean';
  }

  esEditable(clave: string): boolean {
    const noEditables = ['certificado', 'id'];
    return !noEditables.includes(clave);
  }

  get editableKeys(): string[] {
    return Object.keys(this.caja || {}).filter(key => this.esEditable(key));
  }

  trackByClave(index: number, item: { clave: string, valor: any }): string {
    return item.clave;
  }
}
