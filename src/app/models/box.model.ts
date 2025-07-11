export interface BoxObtener {
  NSERIE: string;
  caneth: string;
  localizacion: string;
}

export interface BoxAnadir {
  certificado: string;            // PRIMARY KEY
  ipinterno?: string;
  ipredmaquina?: string;
  mascaradered?: string;
  diagnostico?: string;
  router?: string;
  caneth?: string;
  referenciaagerec?: string;
  sim?: number;
  pin?: number;
  punk?: number;
  Nserie?: number;
  numerotlf?: number;
  roaming?: string;
  ultimaverificacion?: string;
  sellorojo?: string;
  selloazul?: string;
  localizacion?: string;
  pinteltonika?: string;
  datos?: string;
}

