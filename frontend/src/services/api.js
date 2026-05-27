const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const BASE = `${API_URL}/api`;

async function manejarRespuesta(respuesta) {
  if (!respuesta.ok) {
    const datos = await respuesta.json().catch(() => ({}));
    throw new Error(datos.error || `Error HTTP ${respuesta.status}`);
  }
  return respuesta.json();
}

export const api = {
  listarCuentas: async () => {
    const r = await fetch(`${BASE}/cuentas`);
    return manejarRespuesta(r);
  },

  listarTransferencias: async () => {
    const r = await fetch(`${BASE}/transferencias`);
    return manejarRespuesta(r);
  },

  obtenerTransferencia: async (id) => {
    const r = await fetch(`${BASE}/transferencias/${id}`);
    return manejarRespuesta(r);
  },

  crearTransferencia: async (datos) => {
    const r = await fetch(`${BASE}/transferencias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    return manejarRespuesta(r);
  },
};
