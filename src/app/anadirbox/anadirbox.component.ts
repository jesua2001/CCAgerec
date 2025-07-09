import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { BoxService } from '../core/servicies/box.service';
import { BoxAnadir } from '../models/box.model';

@Component({
  selector: 'app-anadirbox',
  templateUrl: './anadirbox.component.html',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    FormsModule,
    IonButton,
    IonText,
    IonList
  ]
})
export class AnadirboxComponent implements OnInit {
  cajas: BoxAnadir[] = [];
  nuevaCaja: BoxAnadir = { certificado: '' };
  mensaje: string = '';

  constructor(private cajaService: BoxService) {}

  ngOnInit() {
    this.obtenerCajas(); // en caso de que quieras cargar cajas existentes
  }

  crearCaja() {
    if (!this.nuevaCaja.certificado) {
      this.mensaje = 'El certificado es obligatorio.';
      return;
    }

    this.cajaService.crearCaja(this.nuevaCaja).subscribe({
      next: () => {
        this.mensaje = 'Caja creada correctamente';
        this.nuevaCaja = { certificado: '' };
        this.obtenerCajas(); // Recargar lista
      },
      error: () => this.mensaje = 'Error al crear la caja'
    });
  }

  obtenerCajas() {
    //Proxima actualizacion
  }

  eliminarCaja(certificado: string) {
    //Proxima actualizacion

  }
}
