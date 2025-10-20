import { Component } from '@angular/core';
import { IonContent, IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonContent, IonCard, IonCardContent, IonIcon, CommonModule, FormsModule]
})
export class Tab1Page {
  gastos: any[] = [];
  totalGastado: number = 0;


  ionViewWillEnter() {
    this.cargarGastos();
  }

  cargarGastos() {
    this.gastos = JSON.parse(localStorage.getItem('gastos') || '[]');
    this.totalGastado = this.gastos.reduce((acc, g) => acc + Number(g.monto), 0);
  }
}