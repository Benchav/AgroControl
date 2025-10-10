import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { User, Mail, MapPin, Bell, Lock } from "lucide-react";

export default function Perfil() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Perfil de Usuario</h2>
        <p className="text-muted-foreground">Gestiona tu información personal y configuración</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Foto de Perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-4xl">
                JD
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Cambiar Foto</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nombre Completo
              </Label>
              <Input id="nombre" placeholder="Juan Pérez" defaultValue="Juan Pérez" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input id="email" type="email" placeholder="juan@example.com" defaultValue="juan@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ubicacion" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Ubicación
              </Label>
              <Input id="ubicacion" placeholder="Madrid, España" defaultValue="Madrid, España" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Configuración de Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Riego</p>
              <p className="text-sm text-muted-foreground">Recibe notificaciones cuando sea momento de regar</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Cosecha</p>
              <p className="text-sm text-muted-foreground">Te avisamos cuando se acerque el momento de cosechar</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Plagas/Enfermedades</p>
              <p className="text-sm text-muted-foreground">Notificaciones sobre problemas detectados en tus lotes</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mensajes de la Comunidad</p>
              <p className="text-sm text-muted-foreground">Nuevas respuestas o menciones en el chat</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current">Contraseña Actual</Label>
            <Input id="current" type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new">Nueva Contraseña</Label>
            <Input id="new" type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirmar Nueva Contraseña</Label>
            <Input id="confirm" type="password" placeholder="••••••••" />
          </div>
          <div className="flex justify-end">
            <Button>Cambiar Contraseña</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de la Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Lotes Activos</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-success">156</p>
              <p className="text-sm text-muted-foreground">Kg Cosechados</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-accent">4,230</p>
              <p className="text-sm text-muted-foreground">Litros Ahorrados</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold text-warning">89</p>
              <p className="text-sm text-muted-foreground">Días de Uso</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
