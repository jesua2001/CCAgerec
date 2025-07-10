import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent, IonInput, IonItem, IonLabel, IonText
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { BoxService } from "../core/servicies/box.service";

@Component({
  selector: 'app-modificarcaja',
  templateUrl: './modificarcaja.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonText,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent
  ]
})
export class ModificarcajaComponent {
  mensaje: string = '';
  error: string = '';
  caja: any = null;
  certificado?: string;
  trackByClave(index: number, item: { clave: string, valor: any }): string {
    return item.clave;
  }


  constructor(private cajaService: BoxService) {}

  ngOnInit(): void {
    // Inicialización si se requiere
  }

  buscarCaja(): void {
    if (!this.certificado) {
      this.error = 'Por favor, introduce un certificado';
      this.caja = null;
      return;
    }

    this.cajaService.buscarCajaPorCertificado(this.certificado).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.caja = res[0];
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

  objectEntries(obj: any): { clave: string; valor: any }[] {
    return Object.entries(obj)
      .filter(([_, valor]) => valor !== null && valor !== undefined)
      .map(([clave, valor]) => ({ clave, valor }));
  }


  isNumber(value: any): boolean {
    return !isNaN(value) && typeof value !== 'boolean';
  }

  esEditable(clave: string): boolean {
    const noEditables = ['certificado', 'id'];
    return !noEditables.includes(clave);
  }
  actualizarCampo(clave: string, valor: any) {
    this.caja[clave] = valor;
  }

}
