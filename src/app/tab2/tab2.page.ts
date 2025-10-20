import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { PhotoService, UserPhoto } from '../services/photo';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  descripcion = '';
  monto: number | null = null;
  usuario = '';
  participantes = ['Juan', 'María', 'Pedro'];
  selectedParticipantes: string[] = [];

  constructor(public photoService: PhotoService) { }

  async ionViewWillEnter() {
    await this.photoService.loadSaved();
  }

  async addPhotoToGallery() {
    const photo = await this.photoService.addNewToGallery();
    setTimeout(() => {
      this.scrollToBottom();
    }, 300);
  }

  private scrollToBottom() {
    if (this.content) {
      this.content.scrollToBottom(500);
    }
  }

  guardarGasto() {
  
    const receiptPhoto = this.photoService.photos[0]?.webviewPath || null;
    if (!this.descripcion || !this.monto || !this.usuario || !receiptPhoto) {
      alert('Completa todos los campos y toma la foto del recibo');
      return;
    }
    const nuevoGasto = {
      descripcion: this.descripcion,
      monto: this.monto,
      usuario: this.usuario,
      participantes: this.selectedParticipantes.length ? this.selectedParticipantes : [this.usuario],
      fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      receiptPhoto
    };
    const gastos = JSON.parse(localStorage.getItem('gastos') || '[]');
    gastos.push(nuevoGasto);
    localStorage.setItem('gastos', JSON.stringify(gastos));
    this.descripcion = '';
    this.monto = null;
    this.usuario = '';
    this.selectedParticipantes = [];
    // No limpiar la galería, solo los campos
    alert('Gasto guardado');
  }

  toggleParticipante(nombre: string) {
    if (this.selectedParticipantes.includes(nombre)) {
      this.selectedParticipantes = this.selectedParticipantes.filter(p => p !== nombre);
    } else {
      this.selectedParticipantes.push(nombre);
    }
  }
}