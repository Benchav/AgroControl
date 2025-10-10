import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onSuccess?: (token: string) => void;
};

export default function Loguin({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; global?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "El correo es obligatorio.";
    else if (!emailRegex.test(email)) e.email = "Introduce un correo válido.";
    if (!password) e.password = "La contraseña es obligatoria.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    setErrors({});
    if (!validate()) return;
    setLoading(true);
    try {
      // Reemplaza esta simulación con tu llamada real (fetch/axios)
      // Ejemplo con fetch:
      // const res = await fetch('/api/auth/login', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email, password }) });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');

      await new Promise((r) => setTimeout(r, 800)); // simulación
      const fakeToken = "fake-jwt-token";

      // Guardar token si el usuario eligió recordar
      if (remember) localStorage.setItem("auth_token", fakeToken);
      else sessionStorage.setItem("auth_token", fakeToken);

      onSuccess?.(fakeToken);

      // Redirige al dashboard (ajusta la ruta según tu app)
      navigate("/dashboard");
    } catch (err: any) {
      setErrors({ global: err?.message || "Error al iniciar sesión. Intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="h-14 w-14 rounded-full flex items-center justify-center border-2 border-green-700">
            <span className="text-green-700 font-bold">AC</span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-green-900 text-center mb-6">Inicia Sesión</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo Electrónico"
                className={`w-full border rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                  errors.email ? "border-red-400" : "border-gray-200"
                }`}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="sr-only" htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className={`w-full border rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                  errors.password ? "border-red-400" : "border-gray-200"
                }`}
                aria-invalid={!!errors.password}
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-green-200"
                />
                Recuérdame
              </label>

              <a href="#" className="text-sm underline text-green-800">¿Olvidaste tu contraseña?</a>
            </div>

            {errors.global && <p className="text-sm text-red-500">{errors.global}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-green-800 text-white font-medium hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
              </button>
            </div>

            <p className="text-center text-sm text-gray-700">
              ¿No tienes cuenta? <a href="/registro" className="font-semibold text-green-900 underline">Regístrate</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}