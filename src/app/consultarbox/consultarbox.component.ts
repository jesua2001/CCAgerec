import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { IonButton, IonContent, IonInput, IonItem, IonLabel } from "@ionic/angular/standalone";
import { BoxService } from "../core/servicies/box.service";
import { BoxObtener } from "../models/box.model";
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-consultarbox',
  templateUrl: './consultarbox.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    FormsModule,

  ]
})
export class ConsultarboxComponent implements OnInit {

  numeroSerie: string = '';
  mensajeError: string = '';
  informationCaja: BoxObtener[] = [];
  toastController: ToastController ;

  constructor(private boxService: BoxService, private ToastController: ToastController) {
  this.toastController = ToastController;
  }

  ngOnInit() {
  }

  consultarCaja() {
    if (!this.numeroSerie.trim()) {
      this.mensajeError = 'El número de serie no puede estar vacío.';
      console.error("Error al obtener la IP de la caja: esto es si no hay datos ", this.numeroSerie);
      return;
    }

    this.boxService.getcaneth(this.numeroSerie).subscribe({
      next: (response) => {
        if (response.length==0){
          this.mensajeError = 'No se encontró ninguna caja con ese número de serie.';
          this.informationCaja = [];
          this.mostrarToast("La caja no existe o no se ha encontrado");
        }else {
          this.informationCaja = response;
          this.mensajeError = '';
        }
      },
      error: () => {
        this.mensajeError = 'Ocurrió un error al consultar la caja.';
        this.mostrarToast("Error al consultar la caja.");
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
