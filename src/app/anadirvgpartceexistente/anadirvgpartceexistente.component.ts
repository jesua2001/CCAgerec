import { Component, OnInit } from '@angular/core';
import { MaquinaService } from '../core/servicies/maquina.service';
import { Maquina } from '@models/maquina.model';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-anadirvgpartceexistente',
  templateUrl: './anadirvgpartceexistente.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    FormsModule,
    CommonModule
  ]
})
export class AnadirvgpartceexistenteComponent implements OnInit {
  modelo: string = '';
  marcaBusqueda: string = '';
  ceEncontrado: number | null = null;
  nuevaMaquina: Partial<Maquina> = {};  // Usamos Partial para poder asignar propiedades una a una
  fotoArchivo: File | null = null;

  constructor(
    private maquinaService: MaquinaService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  onFotoSeleccionada(event: any) {
    const archivo: File = event.target.files[0];
    const tiposValidos = ['image/jpeg', 'image/jpg', 'image/png'];
    if (archivo && tiposValidos.includes(archivo.type)) {
      this.fotoArchivo = archivo;
    } else {
      this.mostrarToast('Formato no válido. Solo se aceptan JPG, JPEG y PNG');
    }
  }

  buscarCEExistente() {
    if (!this.modelo || !this.marcaBusqueda) {
      this.mostrarToast('Debes introducir modelo y marca');
      return;
    }

    this.maquinaService
      .obtenerCE(this.modelo, this.marcaBusqueda, this.nuevaMaquina.serie ?? '')
      .subscribe({
        next: (res) => {
          if (!res || res.length === 0) {
            this.ceEncontrado = null;
            this.crearMaquinaConCE();
          } else {
            this.ceEncontrado = res[0].CE;
            this.mostrarToast('CE encontrado. Rellena los datos de la nueva máquina');
          }
        },
        error: () => {
          this.mostrarToast('Error al buscar el CE');
        },
      });
  }

  crearMaquinaConCE() {
    if (!this.ceEncontrado) {
      this.mostrarToast('No se ha encontrado CE. Redirigiendo a creación de CE nuevo...');
      setTimeout(() => {
        this.router.navigate(['/anadircenuevo']);
      }, 1500);
      return;
    }
    console.log('nuevamaquina ', this.nuevaMaquina)
    // Construir el objeto de datos que espera el backend
    const data: any = {
      modelo: this.nuevaMaquina.modelo || '',
      marca: this.nuevaMaquina.marca || '',
      serie: this.nuevaMaquina.serie || '',
      CE: this.ceEncontrado,
      URL_hidraulico: this.nuevaMaquina.URL_hidraulico || '',
      URL_electrica: this.nuevaMaquina.URL_electrica || '',
      URL_tecnico: this.nuevaMaquina.URL_tecnico || '',
      URL_recambio: this.nuevaMaquina.URL_recambio || '',
      URL_operario: this.nuevaMaquina.URL_operario || '',
      URL_dysplay: this.nuevaMaquina.URL_dysplay || ''
    };


    this.maquinaService
      .anadirNuevaMaquinaConCEEquivalente(data)
      .subscribe({
        next: () => {
          this.mostrarToast('Máquina creada con CE existente');
        },
        error: () => {
          this.mostrarToast('Error al crear la máquina');
        }
      });
  }


  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }
}
