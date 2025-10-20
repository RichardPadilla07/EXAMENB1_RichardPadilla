import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class Tab3Page implements OnInit {
  recibos: { foto: string; descripcion: string; fecha: string; monto: number }[] = [];

  ngOnInit() {
    const gastos = JSON.parse(localStorage.getItem('gastos') || '[]');
    this.recibos = gastos
      .filter((g: any) => g.receiptPhoto)
      .map((g: any) => ({
        foto: g.receiptPhoto,
        descripcion: g.descripcion || '',
        fecha: g.fecha || '',
        monto: g.monto || 0
      }));
  }
}