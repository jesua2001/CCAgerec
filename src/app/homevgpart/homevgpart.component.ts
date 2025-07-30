import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { IonButton, IonContent, IonInput, IonItem, IonLabel } from "@ionic/angular/standalone";
import { MaquinaService } from "../core/servicies/maquina.service";
import { Maquina } from "@models/maquina.model";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {ToastController} from "@ionic/angular";
import {TmplAstHostElement} from "@angular/compiler";
import {BoxObtener} from "@models/box.model";

@Component({
  selector: 'app-homevgpart',
  templateUrl: './homevgpart.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    NgForOf,
    NgIf,
    FormsModule
  ]
})
export class HomevgpartComponent  implements OnInit {

  modelo: string = '';
  marca: string = '';
  numeroSerie: string = '';
  mensajeError: string = '';
  informationMaquina: Maquina[] = [];
  toastController: ToastController;

  constructor(private maquina: MaquinaService, private ToastController: ToastController) {
    this.toastController = ToastController;
  }

  ngOnInit() {}

  consultarHomevgparts() {
      if (!this.modelo.trim()) {
        this.mostrarToast("El modelo es obligatorio.");
        return;
      }
      if (!this.marca.trim()) {
        this.mostrarToast("La marca es obligatorio.");
      return;
      }

      this.maquina.obtenerEquivalencia(this.modelo, this.marca, this.numeroSerie).subscribe({
        next: (response) => {
          if (response.length==0){
            this.mensajeError = 'No se encontró ninguna máquina con ese modelo, marca y/o número de serie.';
            this.informationMaquina = [];
          }else {
            this.informationMaquina = response;
            this.mostrarToast("La maquina no existe o no se ha encontrado");
            this.mensajeError = '';
          }
        },
        error: () => {
          this.mensajeError = 'Ocurrió un error al consultar la maquina.';
          console.log("Error al consultar la maquina.");
        }
      });
  }

  anadirVgparts() {

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
