export interface Maquina {
  id: number;
  modelo: string;
  marca: string;
  serie?: string;
  foto: File | Blob;
  url?: string;
  ce: number;

}
