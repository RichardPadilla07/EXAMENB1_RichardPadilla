import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { PhotoService, UserPhoto } from '../services/photo';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab2Page {
  descripcion = '';
  monto: number | null = null;
  usuario = '';
  participantes = ['Juan', 'María', 'Pedro'];
  selectedParticipantes: string[] = [];
  receiptPhoto: string | null = null;

  constructor(public photoService: PhotoService) { }

  toggleParticipante(nombre: string) {
    if (this.selectedParticipantes.includes(nombre)) {
      this.selectedParticipantes = this.selectedParticipantes.filter(p => p !== nombre);
    } else {
      this.selectedParticipantes.push(nombre);
    }
  }

  async takePhoto() {
    try {
      const photo = await this.photoService.addNewToGallery();
      if (photo.webviewPath) {
        this.receiptPhoto = photo.webviewPath;
      } else {
        await this.photoService.loadSaved();
        this.receiptPhoto = this.photoService.photos[0]?.webviewPath || null;
      }
    } catch (error) {
      alert('No se pudo tomar la foto. Asegúrate de dar permisos a la cámara.');
    }
  }

  guardarGasto() {
    if (!this.descripcion || !this.monto || !this.usuario || !this.receiptPhoto) {
      alert('Completa todos los campos y toma la foto del recibo');
      return;
    }
    const nuevoGasto = {
      descripcion: this.descripcion,
      monto: this.monto,
      usuario: this.usuario,
      participantes: this.selectedParticipantes.length ? this.selectedParticipantes : [this.usuario],
      fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      receiptPhoto: this.receiptPhoto
    };
    const gastos = JSON.parse(localStorage.getItem('gastos') || '[]');
    gastos.push(nuevoGasto);
    localStorage.setItem('gastos', JSON.stringify(gastos));
    this.descripcion = '';
    this.monto = null;
    this.usuario = '';
    this.selectedParticipantes = [];
    this.receiptPhoto = null;
    alert('Gasto guardado');
  }
}