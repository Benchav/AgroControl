import React, { useState } from "react";

type FormState = {
  nombre: string;
  correo: string;
  password: string;
  confirmar: string;
  acepto: boolean;
};

export default function RegistroUsuario({ onSuccess }: { onSuccess?: (data: FormState) => void }) {
  const [form, setForm] = useState<FormState>({
    nombre: "",
    correo: "",
    password: "",
    confirmar: "",
    acepto: false,
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!form.correo.trim()) e.correo = "El correo es obligatorio.";
    else if (!emailRegex.test(form.correo)) e.correo = "Introduce un correo válido.";
    if (!form.password) e.password = "La contraseña es obligatoria.";
    else if (form.password.length < 8) e.password = "La contraseña debe tener al menos 8 caracteres.";
    if (form.confirmar !== form.password) e.confirmar = "Las contraseñas no coinciden.";
    if (!form.acepto) (e.acepto as any) = "Debes aceptar los términos.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (k: keyof FormState, value: string | boolean) => {
    setForm((s) => ({ ...s, [k]: value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
     
      await new Promise((r) => setTimeout(r, 900));
      setMessage("Cuenta creada con éxito.");
      onSuccess?.(form);
      setForm({ nombre: "", correo: "", password: "", confirmar: "", acepto: false });
    } catch (err) {
      setMessage("Ocurrió un error. Intenta de nuevo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          {/* Sustituye la línea siguiente por: <img src="/logo.png" alt="AgroControl" className="h-16"/> */}
          <div className="h-16 w-16 rounded-full flex items-center justify-center border-2 border-green-700">
            <span className="text-green-700 font-bold">AC</span>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-green-900 text-center mb-6">Crea tu Cuenta</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                value={form.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                placeholder="Nombre Completo"
                className={`w-full border rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                  errors.nombre ? "border-red-400" : "border-gray-200"
                }`}
                aria-invalid={!!errors.nombre}
              />
              {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>}
            </div>

            <div>
              <label className="sr-only" htmlFor="correo">Correo</label>
              <input
                id="correo"
                type="email"
                value={form.correo}
                onChange={(e) => handleChange("correo", e.target.value)}
                placeholder="Correo Electrónico"
                className={`w-full border rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                  errors.correo ? "border-red-400" : "border-gray-200"
                }`}
                aria-invalid={!!errors.correo}
              />
              {errors.correo && <p className="text-sm text-red-500 mt-1">{errors.correo}</p>}
            </div>

            <div>
              <label className="sr-only" htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Contraseña"
                className={`w-full border rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                  errors.password ? "border-red-400" : "border-gray-200"
                }`}
                aria-invalid={!!errors.password}
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="sr-only" htmlFor="confirmar">Confirmar contraseña</label>
              <input
                id="confirmar"
                type="password"
                value={form.confirmar}
                onChange={(e) => handleChange("confirmar", e.target.value)}
                placeholder="Confirmar Contraseña"
                className={`w-full border rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                  errors.confirmar ? "border-red-400" : "border-gray-200"
                }`}
                aria-invalid={!!errors.confirmar}
              />
              {errors.confirmar && <p className="text-sm text-red-500 mt-1">{errors.confirmar}</p>}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="acepto"
                type="checkbox"
                checked={form.acepto}
                onChange={(e) => handleChange("acepto", e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 focus:ring-2 focus:ring-green-200"
                aria-invalid={!!errors.acepto}
              />
              <label htmlFor="acepto" className="text-sm text-gray-700">
                He leído y acepto los <a className="underline text-green-800" href="#">Términos y Condiciones</a> y la <a className="underline text-green-800" href="#">Política de Privacidad</a>
              </label>
            </div>
            {errors.acepto && <p className="text-sm text-red-500">{errors.acepto as any}</p>}

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-md bg-green-800 text-white font-medium hover:opacity-95 disabled:opacity-60"
              >
                {submitting ? "Creando cuenta..." : "Crear Cuenta"}
              </button>
            </div>

            {message && <p className="text-center text-sm text-green-700">{message}</p>}

            <p className="text-center text-sm text-gray-700">
              ¿Ya tienes una cuenta? <a href="/" className="font-semibold text-green-900 underline">Inicia Sesión</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}