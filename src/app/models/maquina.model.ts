export interface Maquina {
  id: number;
  modelo: string;
  marca: string;
  serie?: string;
  foto: File | Blob;
  motor?: string;
  URL_hidraulico?: string;
  URL_electrica?: string;
  URL_tecnico?: string;
  URL_recambio?: string;
  URL_operario?: string;
  URL_display?: string;
  CE: number;
  vacio:boolean;
}
