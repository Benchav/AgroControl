import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, CheckCircle2 } from "lucide-react";

const recomendaciones2x2 = [
  {
    id: 1,
    nombre: "Huerto de Hoja y Raíz",
    plantas: [
      { nombre: "Lechugas", cantidad: 8 },
      { nombre: "Rábanos", cantidad: 20 },
      { nombre: "Zanahorias", cantidad: 4 },
    ],
    razon: "Compatibles en agua y luz, diferentes profundidades de raíz",
    esquema: "2 filas de lechugas + rábanos intercalados + zanahorias en bordes",
  },
  {
    id: 2,
    nombre: "Huerto Aromático Compacto",
    plantas: [
      { nombre: "Albahaca", cantidad: 4 },
      { nombre: "Perejil", cantidad: 6 },
      { nombre: "Cebollín", cantidad: 8 },
    ],
    razon: "Todas aromáticas, compatibles, requieren poco espacio",
    esquema: "Albahaca al centro, perejil en cuadrantes, cebollín en bordes",
  },
  {
    id: 3,
    nombre: "Huerto Mini Mediterráneo",
    plantas: [
      { nombre: "Tomate Cherry", cantidad: 1 },
      { nombre: "Albahaca", cantidad: 2 },
      { nombre: "Rúcula", cantidad: 6 },
    ],
    razon: "Asociación clásica, tomate y albahaca se benefician mutuamente",
    esquema: "Tomate al centro con tutor, albahaca alrededor, rúcula en espacios",
  },
];

const recomendaciones4x4 = [
  {
    id: 1,
    nombre: "Huerto Completo Mediterráneo",
    plantas: [
      { nombre: "Tomates", cantidad: 4 },
      { nombre: "Pimientos", cantidad: 2 },
      { nombre: "Albahaca", cantidad: 4 },
      { nombre: "Lechugas", cantidad: 8 },
    ],
    razon: "Combinación productiva, altura variada, maximiza espacio vertical",
    esquema: "Tomates y pimientos con tutores en fondo, albahaca intermedia, lechugas al frente",
  },
  {
    id: 2,
    nombre: "Huerto de Raíces y Tubérculos",
    plantas: [
      { nombre: "Zanahorias", cantidad: 32 },
      { nombre: "Rábanos", cantidad: 40 },
      { nombre: "Cebollas", cantidad: 20 },
      { nombre: "Lechugas", cantidad: 8 },
    ],
    razon: "Aprovecha diferentes profundidades de suelo, rotación rápida de rábanos",
    esquema: "Filas intercaladas por tipo, lechugas en esquinas",
  },
  {
    id: 3,
    nombre: "Huerto Vertical Productivo",
    plantas: [
      { nombre: "Judías trepadoras", cantidad: 8 },
      { nombre: "Calabacín", cantidad: 2 },
      { nombre: "Rábanos", cantidad: 30 },
      { nombre: "Espinacas", cantidad: 16 },
    ],
    razon: "Usa espacio vertical (judías), cultivos rápidos (rábanos) rellenan mientras crecen los demás",
    esquema: "Judías con tutores en perímetro, calabacín al centro, rábanos y espinacas intercalados",
  },
];

export default function Recomendaciones() {
  const [selectedSize, setSelectedSize] = useState<"2x2" | "4x4">("2x2");

  const currentRecomendaciones = selectedSize === "2x2" ? recomendaciones2x2 : recomendaciones4x4;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Recomendaciones de Siembra</h2>
        <p className="text-muted-foreground">Combina cultivos ideales para espacios reducidos</p>
      </div>

      <Card className="bg-gradient-primary border-0 text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6" />
            Selecciona el Tamaño de tu Espacio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={selectedSize === "2x2" ? "secondary" : "outline"}
              size="lg"
              onClick={() => setSelectedSize("2x2")}
              className="flex-1"
            >
              2m × 2m
            </Button>
            <Button
              variant={selectedSize === "4x4" ? "secondary" : "outline"}
              size="lg"
              onClick={() => setSelectedSize("4x4")}
              className="flex-1"
            >
              4m × 4m
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {currentRecomendaciones.map((rec) => (
          <Card key={rec.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {rec.nombre}
                <Badge variant="secondary">{selectedSize}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Plantas Incluidas:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {rec.plantas.map((planta, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>
                        <strong>{planta.cantidad}</strong> {planta.nombre}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-semibold mb-1 text-sm">¿Por qué esta combinación?</h4>
                <p className="text-sm text-muted-foreground">{rec.razon}</p>
              </div>

              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-1 text-sm">Distribución Sugerida:</h4>
                <p className="text-sm">{rec.esquema}</p>
              </div>

              <Button className="w-full" variant="default">
                Usar esta Recomendación
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Consejos Generales para Espacios Pequeños</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <p className="font-medium">Aprovecha la verticalidad</p>
              <p className="text-sm text-muted-foreground">
                Usa tutores, enrejados y plantas trepadoras para maximizar el espacio
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <p className="font-medium">Rotación de cultivos rápidos</p>
              <p className="text-sm text-muted-foreground">
                Plantas como rábanos y lechugas pueden cosecharse en 30-45 días
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <p className="font-medium">Asociaciones beneficiosas</p>
              <p className="text-sm text-muted-foreground">
                Tomates con albahaca, zanahorias con cebollas - se protegen mutuamente
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
