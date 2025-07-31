import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { IonButton, IonContent, IonInput, IonItem, IonLabel } from "@ionic/angular/standalone";
import { MaquinaService } from "../core/servicies/maquina.service";
import { Maquina } from "@models/maquina.model";
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {ToastController} from "@ionic/angular";
import { Router } from '@angular/router';


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


  vacio: boolean = false;
  mostrarBotonesAnadir = false;

  toastController: ToastController;

  constructor(private maquina: MaquinaService, private ToastController: ToastController, private router: Router) {
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
  next: (response: any) => {

    // Caso en que viene vacía la respuesta (ej: { vacio: true })
    if (response.vacio === true) {
      this.vacio = true;
      this.informationMaquina = [];
      this.mostrarBotonesAnadir = true;
      this.mostrarToast("No se encontró ninguna máquina con ese modelo, marca o número de serie.");
    } else {
      this.vacio = false;
      this.informationMaquina = response;
      this.mostrarBotonesAnadir = false;
    }
  },
  error: () => {
    this.mostrarToast('Ocurrió un error al consultar la máquina.');
    this.vacio = false;
    this.mostrarBotonesAnadir = false;
  }
});
  }

  anadirVgpartsCENuevo() {
    this.router.navigate(['/anadircenuevo'])
  }

  anadirVgpartsCEExistente() {
    this.router.navigate(['/anadirceexistente'])
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
