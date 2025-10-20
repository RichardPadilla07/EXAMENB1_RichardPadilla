import { Injectable } from '@angular/core';

export interface Recibo {
  foto: string;
  descripcion?: string;
  fecha?: string;
  monto?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReciboService {
  private recibos: Recibo[] = [];

  agregarRecibo(recibo: Recibo) {
    this.recibos.push(recibo);
  }

  obtenerRecibos(): Recibo[] {
    return this.recibos;
  }
}
