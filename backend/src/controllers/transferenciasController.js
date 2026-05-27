import { pubsub, TOPIC_NAME } from '../config/pubsub.js';
import { store } from '../data/store.js';

export function listarCuentas(req, res) {
  res.status(200).json({ cuentas: store.listarCuentas() });
}

export function listarTransferencias(req, res) {
  res.status(200).json({ transferencias: store.listarTransferencias() });
}

export function obtenerTransferencia(req, res) {
  const t = store.buscarTransferencia(req.params.id);
  if (!t) return res.status(404).json({ error: 'Transferencia no encontrada.' });
  res.status(200).json(t);
}

export async function crearTransferencia(req, res) {
  try {
    const { origen, destino, monto } = req.body;

    if (!origen || !destino) {
      return res.status(400).json({ error: 'Debes indicar cuenta origen y destino.' });
    }
    if (origen === destino) {
      return res.status(400).json({ error: 'El origen y el destino no pueden ser la misma cuenta.' });
    }
    const montoNum = Number(monto);
    if (!montoNum || montoNum <= 0) {
      return res.status(400).json({ error: 'El monto debe ser mayor a 0.' });
    }
    if (!store.buscarCuenta(origen) || !store.buscarCuenta(destino)) {
      return res.status(400).json({ error: 'Alguna de las cuentas no existe.' });
    }

    const transferencia = store.crearTransferencia({ origen, destino, monto: montoNum });

    const datos = JSON.stringify({ id: transferencia.id });
    await pubsub.topic(TOPIC_NAME).publishMessage({ data: Buffer.from(datos) });

    res.status(202).json(transferencia);
  } catch (error) {
    console.error('Error al crear transferencia:', error.message);
    res.status(500).json({ error: 'No se pudo iniciar la transferencia.' });
  }
}
