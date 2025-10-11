import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplets, CheckCircle2 } from "lucide-react";

export default function Riego() {
  const [open, setOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    largo: "",
    ancho: "",
    cultivo: "",
    distancia: "",
  });

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateMaterials = () => {
    const area = Number(formData.largo) * Number(formData.ancho);
    const distancia = Number(formData.distancia) || 30;
    const numLineas = Math.floor(Number(formData.ancho) * 100 / distancia) || 0;

    return {
      tubosPrincipales: `${formData.largo || 0}m de tubo principal (16mm)`,
      tubosSecundarios: `${(Number(formData.largo) * numLineas) || 0}m de tubería secundaria (13mm)`,
      goteros: `${Math.floor((Number(formData.largo) * 100 / (distancia || 1)) * numLineas) || 0} goteros (2L/h)`,
      conectores: `${numLineas + 2} conectores en T`,
      codos: `4 codos de 90°`,
      filtro: "1 filtro de malla",
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Gestión de Riego por Goteo</h2>
        <p className="text-muted-foreground">Diseña tu sistema de riego optimizado</p>
      </div>

      <Card className="bg-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Droplets className="h-6 w-6" />
            Diseñador de Sistema de Riego
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white">
          <p className="mb-4">
            Configura un sistema de riego eficiente para tu huerta. Responde algunas preguntas 
            y obtendrás una recomendación personalizada de materiales y configuración.
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="lg" className="bg-gradient-to-r from-green-800 to-green-600 font-bold">
                Iniciar Configuración
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Configurar Sistema de Riego</DialogTitle>
              </DialogHeader>
              
              {!showResults ? (
                <div className="space-y-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="largo">Largo del área (metros)</Label>
                    <Input 
                      id="largo" 
                      type="number" 
                      placeholder="4"
                      value={formData.largo}
                      onChange={(e) => setFormData({...formData, largo: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ancho">Ancho del área (metros)</Label>
                    <Input 
                      id="ancho" 
                      type="number" 
                      placeholder="2"
                      value={formData.ancho}
                      onChange={(e) => setFormData({...formData, ancho: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cultivo">Tipo de cultivo</Label>
                    <Select value={formData.cultivo} onValueChange={(v) => setFormData({...formData, cultivo: v})}>
                      <SelectTrigger >
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tomate" className="focus:bg-green-500">Tomates</SelectItem>
                        <SelectItem value="lechuga" className="focus:bg-green-500">Lechugas</SelectItem>
                        <SelectItem value="pimiento" className="focus:bg-green-500">Pimientos</SelectItem>
                        <SelectItem value="zanahoria" className="focus:bg-green-500">Zanahorias</SelectItem>
                        <SelectItem value="mixto" className="focus:bg-green-500">Cultivo Mixto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="distancia">Distancia entre plantas (cm)</Label>
                    <Input 
                      id="distancia" 
                      type="number" 
                      placeholder="30"
                      value={formData.distancia}
                      onChange={(e) => setFormData({...formData, distancia: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="destructive" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Generar Recomendación</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 py-4 overflow-y-auto max-h-[80vh]">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-6 w-6" />
                    <h3 className="text-lg font-semibold">Recomendación Generada</h3>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Lista de Materiales</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(calculateMaterials()).map(([key, value]) => (
                        <div key={key} className="flex items-start gap-2 p-2 bg-muted rounded">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold mb-2">Recomendación de Riego</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Frecuencia:</strong> 2 veces al día (mañana y tarde)</p>
                      <p><strong>Duración:</strong> 30-45 minutos por sesión</p>
                      <p><strong>Caudal total:</strong> ~{Number(formData.largo) * Number(formData.ancho) * 2}L por día</p>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <h4 className="font-semibold mb-2">Esquema de Instalación</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Sistema de goteo básico con líneas paralelas
                    </p>
                    <div className="bg-white p-4 rounded border">
                      <pre className="text-xs">
{`┌──────────────────────────┐
│   Filtro + Válvula       │
└─────────┬────────────────┘
          │ Tubo Principal
     ┌────┴────┬────┬────┐
     │         │    │    │
     ●─────────●────●────● Goteros
     │         │    │    │
     ●─────────●────●────● Líneas
     │         │    │    │
     ●─────────●────●────● Secundarias`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setShowResults(false);
                        setFormData({ largo: "", ancho: "", cultivo: "", distancia: "" });
                      }}
                    >
                      Nueva Configuración
                    </Button>
                    <Button className="flex-1" onClick={() => setOpen(false)}>
                      Guardar Configuración
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* --- Visor 3D embebido (RealityMax) --- */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Modelo 3D AgroControl 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Vista interactiva modelo AgroControl 1
            </p>

            <div className="w-full rounded-lg overflow-hidden border bg-black">
              {/* Responsive 16:9 container */}
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src="https://realitymax.co/b1OPJu"
                  title="Modelo 3D - AgroControl"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button asChild>
                <a href="https://realitymax.co/b1OPJu" target="_blank" rel="noreferrer">Abrir en pestaña nueva</a>
              </Button>
              <Button variant="outline" onClick={() => window.open("https://realitymax.co/b1OPJu", "_blank")}>
                Abrir en ventana
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>


       
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Modelo 3D AgroControl 2</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Vista interactiva modelo AgroControl 2
            </p>

            <div className="w-full rounded-lg overflow-hidden border bg-black">
              {/* Responsive 16:9 container */}
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src="https://realitymax.co/4YaU4X"
                  title="Modelo 3D - AgroControl 2"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button asChild>
                <a href="https://realitymax.co/4YaU4X" target="_blank" rel="noreferrer">Abrir en pestaña nueva</a>
              </Button>
              <Button variant="outline" onClick={() => window.open("https://realitymax.co/4YaU4X", "_blank")}>
                Abrir en ventana
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>



      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Beneficios del Riego por Goteo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Ahorro de agua</p>
                <p className="text-sm text-muted-foreground">Hasta 50% menos consumo vs riego tradicional</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Mayor eficiencia</p>
                <p className="text-sm text-muted-foreground">Agua directa a las raíces, menos evaporación</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Menor maleza</p>
                <p className="text-sm text-muted-foreground">Solo se riega donde hay plantas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consejos de Mantenimiento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">Revisa los goteros semanalmente para detectar obstrucciones</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">Limpia el filtro cada 15 días o cuando notes baja presión</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">Ajusta los tiempos según el clima y la estación</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}