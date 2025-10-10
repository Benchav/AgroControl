import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";

const mockMessages = [
  {
    id: 1,
    user: "María García",
    initials: "MG",
    message: "Hola a todos! Alguien tiene experiencia con plagas en tomates? Estoy teniendo problemas con pulgones.",
    time: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    user: "Carlos Ruiz",
    initials: "CR",
    message: "¡Hola María! Yo tuve el mismo problema el mes pasado. Una solución natural es hacer un spray con agua y jabón neutro. Funciona muy bien.",
    time: "10:35 AM",
    isOwn: false,
  },
  {
    id: 3,
    user: "Tú",
    initials: "TU",
    message: "También puedes plantar albahaca cerca de los tomates, ayuda a repeler plagas naturalmente.",
    time: "10:37 AM",
    isOwn: true,
  },
  {
    id: 4,
    user: "Ana López",
    initials: "AL",
    message: "Yo uso aceite de neem diluido en agua. Es orgánico y muy efectivo contra todo tipo de plagas.",
    time: "10:42 AM",
    isOwn: false,
  },
  {
    id: 5,
    user: "María García",
    initials: "MG",
    message: "Gracias a todos por los consejos! Voy a probar con el spray de jabón primero 😊",
    time: "10:45 AM",
    isOwn: false,
  },
];

export default function Comunidad() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      // Aquí se enviaría el mensaje
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Comunidad</h2>
        <p className="text-muted-foreground">Comparte experiencias y aprende de otros hortelanos</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle>Chat General - Comunidad Huertos</CardTitle>
          <p className="text-sm text-muted-foreground">256 miembros activos</p>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={msg.isOwn ? "bg-primary text-primary-foreground" : "bg-secondary"}>
                    {msg.initials}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 max-w-[70%] ${msg.isOwn ? "items-end" : ""}`}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-sm">{msg.user}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      msg.isOwn
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Temas Populares Esta Semana</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-3 bg-muted rounded-lg hover:bg-muted/70 cursor-pointer transition-colors">
              <p className="font-medium">Control natural de plagas</p>
              <p className="text-xs text-muted-foreground">45 mensajes</p>
            </div>
            <div className="p-3 bg-muted rounded-lg hover:bg-muted/70 cursor-pointer transition-colors">
              <p className="font-medium">Mejores variedades para principiantes</p>
              <p className="text-xs text-muted-foreground">38 mensajes</p>
            </div>
            <div className="p-3 bg-muted rounded-lg hover:bg-muted/70 cursor-pointer transition-colors">
              <p className="font-medium">Sistemas de riego automático</p>
              <p className="text-xs text-muted-foreground">32 mensajes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Normas de la Comunidad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <p>Comparte conocimientos y experiencias constructivas</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <p>Respeta las opiniones y métodos de otros hortelanos</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <p>Evita spam o promoción excesiva de productos</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <p>Pregunta, todos estamos aprendiendo</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
