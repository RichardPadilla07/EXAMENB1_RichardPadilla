import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface CategoriaReporte {
  nombre: string;
  color: string;
  monto: number;
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab4Page {
  totalGastos: number = 0;
  promedioDia: number = 0;
  categorias: CategoriaReporte[] = [];
  maxCategoriaMonto: number = 1000;
  fechaInicio: string = '';
  fechaFin: string = '';
  diasPeriodo: number = 1;

  ngOnInit() {
    const gastos = JSON.parse(localStorage.getItem('gastos') || '[]');
    if (!gastos.length) return;

 
    const fechas = gastos.map((g: any) => this.parseFecha(g.fecha)).filter(Boolean).sort((a: any, b: any) => a.getTime() - b.getTime());
    this.fechaInicio = this.formatInputDate(fechas[0]);
    this.fechaFin = this.formatInputDate(fechas[fechas.length - 1]);
    this.diasPeriodo = Math.max(1, Math.ceil((fechas[fechas.length - 1] - fechas[0]) / (1000*60*60*24)) + 1);

 
    this.totalGastos = gastos.reduce((sum: number, g: any) => sum + (g.monto || 0), 0);

  
    const categorias = [
      { nombre: 'Comida', color: '#1976d2', monto: 0, keywords: ['cafe', 'cena', 'almuerzo', 'comida', 'desayuno', 'hamburguesa', 'pizza', 'pollo', 'ensalada', 'taco', 'bebida', 'pan'] },
      { nombre: 'Restaurantes', color: '#a259e6', monto: 0, keywords: ['restaurant', 'restaurante', 'sweet', 'coffe', 'coffee', 'pizzeria', 'burger', 'sushi', 'bar', 'parrilla'] },
      { nombre: 'Transporte', color: '#ff9800', monto: 0, keywords: ['uber', 'taxi', 'bus', 'transporte', 'metro', 'cabify', 'movilidad', 'pasaje', 'colectivo'] }
    ];

    for (const g of gastos) {
      const desc = (g.descripcion || '').toLowerCase();
   
      let maxMatches = 0;
      let bestCatIdx = 0;
      categorias.forEach((cat, idx) => {
        const matches = cat.keywords.reduce((acc, k) => acc + (desc.includes(k) ? 1 : 0), 0);
        if (matches > maxMatches || (matches === maxMatches && idx < bestCatIdx)) {
          maxMatches = matches;
          bestCatIdx = idx;
        }
      });
      categorias[bestCatIdx].monto += g.monto || 0;
    }

    this.categorias = categorias.map(({nombre, color, monto}) => ({nombre, color, monto}));
  // El máximo visual de la barra es 1000
  this.maxCategoriaMonto = 1000;
    this.promedioDia = this.totalGastos / this.diasPeriodo;
  }

  parseFecha(fecha: string): Date | null {
   
    if (!fecha) return null;
    if (fecha.includes('/')) {
   
      const [d, m, y] = fecha.split('/');
      return new Date(Number(y) || new Date().getFullYear(), Number(m)-1, Number(d));
    }
    
    const [d, mes] = fecha.split(' ');
    const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    const idx = meses.findIndex(m => m === mes.toLowerCase());
    if (idx >= 0) return new Date(new Date().getFullYear(), idx, Number(d));
    return null;
  }

  formatInputDate(date: Date): string {
    if (!date) return '';
    return date.toISOString().slice(0,10);
  }
}
