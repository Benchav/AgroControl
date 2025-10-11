import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Sun, Droplets, Clock } from "lucide-react";
import { plantsData } from "@/data/plants_data";

// const plantas = [
//   {
//     id: 1,
//     nombre: "Tomate Cherry",
//     nombreCientifico: "Solanum lycopersicum var. cerasiforme",
//     imagen: "🍅",
//     luz: "Pleno sol",
//     agua: "Moderada",
//     ph: "6.0 - 6.8",
//     cosecha: "60-80 días",
//     espacio: "60cm entre plantas",
//     descripcion: "Ideal para espacios pequeños, produce abundantes frutos dulces.",
//   },
//   {
//     id: 2,
//     nombre: "Lechuga Romana",
//     nombreCientifico: "Lactuca sativa var. longifolia",
//     imagen: "🥬",
//     luz: "Sol parcial",
//     agua: "Alta",
//     ph: "6.0 - 7.0",
//     cosecha: "45-55 días",
//     espacio: "30cm entre plantas",
//     descripcion: "Crujiente y nutritiva, perfecta para ensaladas frescas.",
//   },
//   {
//     id: 3,
//     nombre: "Pimiento Rojo",
//     nombreCientifico: "Capsicum annuum",
//     imagen: "🫑",
//     luz: "Pleno sol",
//     agua: "Moderada",
//     ph: "6.0 - 6.8",
//     cosecha: "70-90 días",
//     espacio: "45cm entre plantas",
//     descripcion: "Rico en vitamina C, excelente para cocinar y ensaladas.",
//   },
//   {
//     id: 4,
//     nombre: "Zanahoria",
//     nombreCientifico: "Daucus carota",
//     imagen: "🥕",
//     luz: "Pleno sol",
//     agua: "Moderada",
//     ph: "6.0 - 6.8",
//     cosecha: "70-80 días",
//     espacio: "10cm entre plantas",
//     descripcion: "Raíz dulce y crujiente, rica en betacaroteno.",
//   },
//   {
//     id: 5,
//     nombre: "Albahaca",
//     nombreCientifico: "Ocimum basilicum",
//     imagen: "🌿",
//     luz: "Pleno sol",
//     agua: "Moderada",
//     ph: "6.0 - 7.5",
//     cosecha: "30-40 días",
//     espacio: "25cm entre plantas",
//     descripcion: "Aromática y sabrosa, esencial en la cocina mediterránea.",
//   },
//   {
//     id: 6,
//     nombre: "Rábano",
//     nombreCientifico: "Raphanus sativus",
//     imagen: "🔴",
//     luz: "Sol parcial",
//     agua: "Moderada",
//     ph: "6.0 - 7.0",
//     cosecha: "25-30 días",
//     espacio: "5cm entre plantas",
//     descripcion: "De crecimiento rápido, crujiente y picante.",
//   },
// ];

export default function Catalogo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlanta, setSelectedPlanta] = useState<typeof plantsData[0] | null>(null);

  const filteredPlantas = plantsData.filter((planta) =>
    planta.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Catálogo de Plantas</h2>
        <p className="text-muted-foreground">Explora las hortalizas disponibles para tu huerta</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar plantas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlantas.map((planta) => (
          <Card 
            key={planta.id}
            className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
            onClick={() => setSelectedPlanta(planta)}
          >
            <CardHeader>
              <div className="text-6xl mb-4 text-center">{planta.imagen}</div>
              <CardTitle className="text-center">{planta.nombre}</CardTitle>
              <p className="text-xs text-muted-foreground text-center italic">
                {planta.planta}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Sun className="h-4 w-4" />
                    Luz
                  </span>
                  <Badge variant="secondary">{planta.plantas}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Droplets className="h-4 w-4" />
                    Agua
                  </span>
                  <Badge variant="secondary">{planta.fechaSiembra}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Cosecha
                  </span>
                  <Badge variant="secondary">{planta.diasTranscurridos}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedPlanta} onOpenChange={() => setSelectedPlanta(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="text-6xl mb-2">{selectedPlanta?.imagen}</div>
              {selectedPlanta?.nombre}
            </DialogTitle>
            <p className="text-sm text-muted-foreground text-center italic">
              {selectedPlanta?.planta}
            </p>
          </DialogHeader>
          {selectedPlanta && (
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedPlanta.notas}</p>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Requerimientos</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-1">Luz</p>
                    <p className="font-medium">{selectedPlanta.fechaSiembra}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-1">Agua</p>
                    <p className="font-medium">{selectedPlanta.diasTranscurridos}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-1">pH del Suelo</p>
                    <p className="font-medium">{selectedPlanta.estado}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-1">Tiempo</p>
                    <p className="font-medium">{selectedPlanta.ubicacion}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm">
                  <span className="font-medium">Espacio requerido:</span> {selectedPlanta.planta}
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Crear Lote con esta Planta</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
