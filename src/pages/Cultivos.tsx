import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, MapPin, Leaf, Sprout } from "lucide-react";

const mockLotes = [
  {
    id: "L001",
    nombre: "Lote Tomates Cherry",
    planta: "Tomate Cherry",
    fechaSiembra: "2025-09-15",
    diasTranscurridos: 25,
    estado: "Saludable",
    ubicacion: "4x4m",
    plantas: 8,
  },
  {
    id: "L002",
    nombre: "Lote Lechugas",
    planta: "Lechuga Romana",
    fechaSiembra: "2025-09-20",
    diasTranscurridos: 20,
    estado: "Creciendo",
    ubicacion: "2x2m",
    plantas: 12,
  },
  {
    id: "L003",
    nombre: "Lote Pimientos",
    planta: "Pimiento Rojo",
    fechaSiembra: "2025-08-30",
    diasTranscurridos: 40,
    estado: "Alerta",
    ubicacion: "4x4m",
    plantas: 6,
  },
];

export default function Cultivos() {
  const [open, setOpen] = useState(false);
  const [selectedLote, setSelectedLote] = useState<typeof mockLotes[0] | null>(null);

  const getEstadoBadge = (estado: string) => {
    const variants = {
      "Saludable": "default",
      "Creciendo": "secondary",
      "Alerta": "destructive",
    };
    return variants[estado as keyof typeof variants] || "default";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Control de Cultivos</h2>
          <p className="text-muted-foreground">Gestiona todos tus lotes de cultivo</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Lote
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Lote</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre del Lote</Label>
                <Input id="nombre" placeholder="Ej: Lote Tomates" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="planta">Tipo de Hortaliza</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar planta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tomate">Tomate</SelectItem>
                    <SelectItem value="lechuga">Lechuga</SelectItem>
                    <SelectItem value="pimiento">Pimiento</SelectItem>
                    <SelectItem value="zanahoria">Zanahoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fecha">Fecha de Siembra</Label>
                <Input id="fecha" type="date" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ubicacion">Ubicación/Área</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tamaño" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2x2">2x2m</SelectItem>
                      <SelectItem value="4x4">4x4m</SelectItem>
                      <SelectItem value="maceta">Maceta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="plantas">N° de Plantas</Label>
                  <Input id="plantas" type="number" placeholder="0" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={() => setOpen(false)}>Crear Lote</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {mockLotes.map((lote) => (
          <Card 
            key={lote.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedLote(lote)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{lote.nombre}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">ID: {lote.id}</p>
                </div>
                <Badge variant={getEstadoBadge(lote.estado) as any}>
                  {lote.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Planta</p>
                    <p className="font-medium">{lote.planta}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Días</p>
                    <p className="font-medium">{lote.diasTranscurridos}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Ubicación</p>
                    <p className="font-medium">{lote.ubicacion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Plantas</p>
                    <p className="font-medium">{lote.plantas}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedLote} onOpenChange={() => setSelectedLote(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedLote?.nombre}</DialogTitle>
          </DialogHeader>
          {selectedLote && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">ID del Lote</Label>
                  <p className="font-medium">{selectedLote.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Estado</Label>
                  <Badge variant={getEstadoBadge(selectedLote.estado) as any} className="mt-1">
                    {selectedLote.estado}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Fecha de Siembra</Label>
                  <p className="font-medium">{selectedLote.fechaSiembra}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Días Transcurridos</Label>
                  <p className="font-medium">{selectedLote.diasTranscurridos} días</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Timeline del Ciclo de Vida</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-success-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Siembra</p>
                      <p className="text-sm text-muted-foreground">{selectedLote.fechaSiembra}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Trasplante</p>
                      <p className="text-sm text-muted-foreground">Pendiente</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Cosecha Estimada</p>
                      <p className="text-sm text-muted-foreground">En {60 - selectedLote.diasTranscurridos} días</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Añadir Observación</Button>
                <Button variant="outline">Editar Lote</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
