export type Area = "2x2" | "4x4" | "maceta" | string;

export type PlantState = "Saludable" | "Creciendo" | "Alerta" | "SinDatos";

export interface PlantLote {

  id: string;
  nombre: string;
  planta: string;
  fechaSiembra: string;
  diasTranscurridos: number;
  estado: PlantState;
  ubicacion: Area;
  plantas: number;
  notas?: string[];
}