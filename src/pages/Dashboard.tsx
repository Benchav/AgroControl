import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Sprout, Droplets, AlertTriangle, Calendar } from "lucide-react";

const productionData = [
  { month: "Ene", kg: 45 },
  { month: "Feb", kg: 52 },
  { month: "Mar", kg: 68 },
  { month: "Abr", kg: 75 },
  { month: "May", kg: 88 },
  { month: "Jun", kg: 95 },
];

const cropDistribution = [
  { name: "Tomates", value: 30, color: "#ef4444" },
  { name: "Lechugas", value: 25, color: "#22c55e" },
  { name: "Zanahorias", value: 20, color: "#f97316" },
  { name: "Pimientos", value: 15, color: "#eab308" },
  { name: "Otros", value: 10, color: "#8b5cf6" },
];

const growthData = [
  { day: "Día 1", altura: 5 },
  { day: "Día 7", altura: 12 },
  { day: "Día 14", altura: 22 },
  { day: "Día 21", altura: 35 },
  { day: "Día 28", altura: 48 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Analítico</h2>
        <p className="text-muted-foreground">Vista general de tus cultivos y actividades</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-primary border-0 text-primary-foreground shadow-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lotes Activos</CardTitle>
            <Sprout className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs opacity-90 mt-1">+2 desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Cosecha</CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5 días</div>
            <p className="text-xs text-muted-foreground mt-1">Lote #03 - Tomates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumo de Agua</CardTitle>
            <Droplets className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">245L</div>
            <p className="text-xs text-muted-foreground mt-1">Últimas 24 horas</p>
          </CardContent>
        </Card>

        <Card className="border-warning/50 bg-warning/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">2</div>
            <p className="text-xs text-muted-foreground mt-1">Requieren atención</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Producción Histórica</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="kg" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Cultivos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progreso de Crecimiento</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="altura" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alerts Widget */}
      <Card className="border-warning/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Alertas Recientes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
            <p className="font-medium text-sm">Posible plaga detectada en Lote #05</p>
            <p className="text-xs text-muted-foreground mt-1">Hace 2 horas</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="font-medium text-sm">Sistema de riego requiere mantenimiento</p>
            <p className="text-xs text-muted-foreground mt-1">Hace 1 día</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
