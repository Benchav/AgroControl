export type NotificationState = "informativo" | "alerta" | "critico";

export interface NotificationModel {
  id: string;
  titulo: string;
  description: string;
  estado: NotificationState;
}