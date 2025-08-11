import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MaquinaService } from '../core/servicies/maquina.service';
import { Maquina } from '@models/maquina.model';
import { ToastController } from '@ionic/angular';
import {FormsModule, NgForm} from '@angular/forms';
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
  tipoMaquina: string = ''; // Se llena desde el ion-select
  urlFoto: string | null = null;
  previewFoto: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private maquinaService: MaquinaService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {}

  onFotoSeleccionada(event: any) {
    const archivo: File = event.target.files[0];
    const tiposValidos = ['image/jpeg', 'image/jpg', 'image/png'];
    if (archivo && tiposValidos.includes(archivo.type)) {
      this.nuevaMaquina.foto = archivo;

      // Leer el archivo para vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.previewFoto = reader.result;
      };
      reader.readAsDataURL(archivo);
    } else {
      this.mostrarToast('Formato no válido. Solo JPG, JPEG y PNG', 'danger');
    }
    }
  private clearFileInput() {
    // limpia el input nativo
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
    // limpia modelo y preview
    delete this.nuevaMaquina.foto;
    this.previewFoto = null;
    this.urlFoto = null;
  }

    crearCaja(form: NgForm) {
      if (!this.tipoMaquina) {
        this.mostrarToast('Debes seleccionar el tipo de máquina', 'danger');
        return;
      }

      if (!this.nuevaMaquina.modelo || !this.nuevaMaquina.marca) {
        this.mostrarToast('Debes completar al menos modelo y marca', 'danger');
        return;
      }

      const maquina: any = {
        modelo: this.nuevaMaquina.modelo || '',
        marca: this.nuevaMaquina.marca || '',
        serie: this.nuevaMaquina.serie || '',
        foto: this.nuevaMaquina.foto || new Blob(),
        motor: this.nuevaMaquina.motor || '',
        URL_hidraulico: this.nuevaMaquina.URL_hidraulico || '',
        URL_electrica: this.nuevaMaquina.URL_electrica || '',
        URL_tecnico: this.nuevaMaquina.URL_tecnico || '',
        URL_recambio: this.nuevaMaquina.URL_recambio || '',
        URL_operario: this.nuevaMaquina.URL_operario || '',
        URL_display: this.nuevaMaquina.URL_display || '',
        CE: 0
      };


      this.maquinaService.anadirCENuevo(maquina, this.tipoMaquina).subscribe({
        next: (res) => {
          if (res.foto) {
            this.urlFoto = `http://localhost:8000/uploads/${res.foto}`;
          }
          this.mostrarToast('Máquina con CE nuevo creada correctamente', 'success');
          form.resetForm();
          this.clearFileInput();
          this.nuevaMaquina = {};
          this.tipoMaquina = '';
        },
        error: () => {
          this.mostrarToast('Error al crear máquina', 'danger');
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
