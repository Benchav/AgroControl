import { ChatMessage } from "@/models/chat_model";

export const mockMessages: ChatMessage[] = [
  {
    id: 1,
    user: "María García",
    initials: "MG",
    message:
      "Hola a todos! ¿Alguien tiene experiencia con plagas en tomates? Estoy teniendo problemas con pulgones.",
    time: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    user: "Carlos López",
    initials: "CL",
    message:
      "Sí, María. Yo tuve ese problema el mes pasado. Te recomiendo aplicar agua con jabón potásico o extracto de ajo.",
    time: "10:32 AM",
    isOwn: false,
  },
  {
    id: 3,
    user: "María García",
    initials: "MG",
    message: "Gracias, Carlos! ¿Cada cuánto debería aplicarlo?",
    time: "10:35 AM",
    isOwn: false,
  },
  {
    id: 4,
    user: "Tú",
    initials: "TU",
    message:
      "También puedes probar con neem, es natural y efectivo contra pulgones.",
    time: "10:36 AM",
    isOwn: true,
  },
];