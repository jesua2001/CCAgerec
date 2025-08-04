import { Component, OnInit } from '@angular/core';
import { MaquinaService } from '../core/servicies/maquina.service';
import { Maquina } from '@models/maquina.model';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-anadirvgpart',
  templateUrl: './anadirvgpart.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonTitle,
    IonSelect,
    IonSelectOption,
    FormsModule,
    CommonModule
  ]
})
export class AnadirvgpartComponent implements OnInit {
  nuevaMaquina: Partial<Maquina> = {};
  fotoArchivo: File | null = null;
  tipoMaquina: string = ''; // Se llena desde el ion-select

  constructor(
    private maquinaService: MaquinaService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {}

  onFotoSeleccionada(event: any) {
    const archivo: File = event.target.files[0];
    const tiposValidos = ['image/jpeg', 'image/jpg', 'image/png'];
    if (archivo && tiposValidos.includes(archivo.type)) {
      this.fotoArchivo = archivo;
    } else {
      this.mostrarToast('Formato no válido. Solo JPG, JPEG y PNG');
    }
  }

  crearCaja() {
    if (!this.tipoMaquina) {
      this.mostrarToast('Debes seleccionar el tipo de máquina');
      return;
    }

    if (!this.nuevaMaquina.modelo || !this.nuevaMaquina.marca) {
      this.mostrarToast('Debes completar al menos modelo y marca');
      return;
    }

    const maquina: any = {
      modelo: this.nuevaMaquina.modelo || '',
      marca: this.nuevaMaquina.marca || '',
      serie: this.nuevaMaquina.serie || '',
      foto: this.fotoArchivo || new Blob(),
      URL_hidraulico: this.nuevaMaquina.URL_hidraulico || '',
      URL_electrica: this.nuevaMaquina.URL_electrica || '',
      URL_tecnico: this.nuevaMaquina.URL_tecnico || '',
      URL_recambio: this.nuevaMaquina.URL_recambio || '',
      URL_operario: this.nuevaMaquina.URL_operario || '',
      URL_dysplay: this.nuevaMaquina.URL_dysplay || '',
      CE: 0 // Se genera en backend
    };

    this.maquinaService.anadirCENuevo(maquina, this.tipoMaquina).subscribe({
      next: () => {
        this.mostrarToast('Máquina con CE nuevo creada correctamente', 'success');
        this.nuevaMaquina = {};
        this.fotoArchivo = null;
        this.tipoMaquina = '';
      },
      error: () => {
        this.mostrarToast('Debes completar al menos modelo y marca', 'danger');
      }
    });
  }

  async mostrarToast(mensaje: string, color: 'success' | 'danger' = 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }
}
