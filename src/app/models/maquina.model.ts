export interface Maquina {
  id: number;
  modelo: string;
  marca: string;
  serie?: string;
  foto: File | Blob;
  URL_hidraulico?: string;
  URL_electrica?: string;
  URL_tecnico?: string;
  URL_recambio?: string;
  URL_operario?: string;
  URL_dysplay?: string;
  ce: number;
  vacio:boolean;
}
