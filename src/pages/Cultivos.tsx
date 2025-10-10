import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, MapPin, Leaf, Sprout } from "lucide-react";

const initialLotes = [
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
  const [lotes, setLotes] = useState(initialLotes);
  const [open, setOpen] = useState(false);
  const [selectedLote, setSelectedLote] = useState<typeof initialLotes[0] | null>(null);

  // Campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    planta: "",
    fechaSiembra: "",
    ubicacion: "",
    plantas: 0,
  });

  // Manejador de cambios de inputs/selects
  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Crear o editar lote
  const handleSave = () => {
    if (selectedLote) {
      // Editar existente
      setLotes((prev) =>
        prev.map((l) =>
          l.id === selectedLote.id
            ? { ...l, ...formData, plantas: Number(formData.plantas) }
            : l
        )
      );
    } else {
      // Crear nuevo
      const newLote = {
        id: `L${(lotes.length + 1).toString().padStart(3, "0")}`,
        nombre: formData.nombre,
        planta: formData.planta,
        fechaSiembra: formData.fechaSiembra,
        diasTranscurridos: 0,
        estado: "Creciendo",
        ubicacion: formData.ubicacion,
        plantas: Number(formData.plantas),
      };
      setLotes((prev) => [...prev, newLote]);
    }

    // Resetear
    setFormData({ nombre: "", planta: "", fechaSiembra: "", ubicacion: "", plantas: 0 });
    setSelectedLote(null);
    setOpen(false);
  };

  // Cargar datos en el formulario cuando se edita
  const openEditDialog = (lote: typeof initialLotes[0]) => {
    setSelectedLote(lote);
    setFormData({
      nombre: lote.nombre,
      planta: lote.planta,
      fechaSiembra: lote.fechaSiembra,
      ubicacion: lote.ubicacion,
      plantas: lote.plantas,
    });
    setOpen(true);
  };

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Saludable: "default",
      Creciendo: "secondary",
      Alerta: "destructive",
    };
    return variants[estado as keyof typeof variants] || "default";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Control de Cultivos
          </h2>
          <p className="text-muted-foreground">Gestiona todos tus lotes de cultivo</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="gap-2"
              onClick={() => {
                setSelectedLote(null);
                setFormData({
                  nombre: "",
                  planta: "",
                  fechaSiembra: "",
                  ubicacion: "",
                  plantas: 0,
                });
              }}
            >
              <Plus className="h-4 w-4" />
              Nuevo Lote
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {selectedLote ? "Editar Lote" : "Crear Nuevo Lote"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre del Lote</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  placeholder="Ej: Lote Tomates"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="planta">Tipo de Hortaliza</Label>
                <Select
                  value={formData.planta}
                  onValueChange={(v) => handleChange("planta", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar planta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tomate Cherry">Tomate Cherry</SelectItem>
                    <SelectItem value="Lechuga Romana">Lechuga Romana</SelectItem>
                    <SelectItem value="Pimiento Rojo">Pimiento Rojo</SelectItem>
                    <SelectItem value="Zanahoria">Zanahoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fecha">Fecha de Siembra</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fechaSiembra}
                  onChange={(e) => handleChange("fechaSiembra", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ubicacion">Ubicación/Área</Label>
                  <Select
                    value={formData.ubicacion}
                    onValueChange={(v) => handleChange("ubicacion", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tamaño" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2x2m">2x2m</SelectItem>
                      <SelectItem value="4x4m">4x4m</SelectItem>
                      <SelectItem value="Maceta">Maceta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="plantas">N° de Plantas</Label>
                  <Input
                    id="plantas"
                    type="number"
                    value={formData.plantas}
                    onChange={(e) => handleChange("plantas", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                {selectedLote ? "Guardar Cambios" : "Crear Lote"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* LISTA DE LOTES */}
      <div className="grid gap-4">
        {lotes.map((lote) => (
          <Card
            key={lote.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openEditDialog(lote)}
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
    </div>
  );
}
