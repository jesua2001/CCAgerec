import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Contiene IonApp e IonRouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonicModule],
})
export class AppComponent {
  constructor() {
    document.body.classList.remove('dark');
  }
}
