import { NotificationModel } from "@/models/notification_model";

export const notificationsData: NotificationModel[] = [
  {
    id: "N001",
    titulo: "Nuevo lote creado",
    description: "Se ha registrado el lote 'Tomates Cherry - Lote A' correctamente.",
    estado: "informativo",
  },
  {
    id: "N002",
    titulo: "Nivel de humedad bajo",
    description: "El sensor del Lote Lechugas indica una humedad por debajo del 40%. Revisa el riego.",
    estado: "alerta",
  },
  {
    id: "N003",
    titulo: "Posible presencia de plagas",
    description: "Se detectaron signos de pulgones en el cultivo de Pimiento Rojo. Recomendación: aplicar control biológico.",
    estado: "critico",
  },
  {
    id: "N004",
    titulo: "Riego completado",
    description: "El sistema de riego del Lote Zanahoria Baby ha finalizado exitosamente.",
    estado: "informativo",
  },
  {
    id: "N005",
    titulo: "Temperatura elevada",
    description: "La temperatura ambiente en el invernadero ha superado los 34°C. Se recomienda ventilar el área.",
    estado: "alerta",
  },
];