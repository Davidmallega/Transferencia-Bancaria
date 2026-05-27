import { store } from '../data/store.js';
import { LIMITE_TRANSFERENCIA } from '../config/pubsub.js';

export function validarYResolver(idTransferencia) {
  const t = store.buscarTransferencia(idTransferencia);
  if (!t || t.estado !== 'validando') return t;

  const cuentaOrigen = store.buscarCuenta(t.origen);

  if (t.monto > LIMITE_TRANSFERENCIA) {
    return store.actualizarTransferencia(t.id, {
      estado: 'rechazada',
      motivo: `Excede el límite por transferencia ($${LIMITE_TRANSFERENCIA.toLocaleString()}).`,
      resuelta: new Date().toISOString(),
    });
  }

  if (cuentaOrigen.saldo < t.monto) {
    return store.actualizarTransferencia(t.id, {
      estado: 'rechazada',
      motivo: 'Saldo insuficiente en la cuenta origen.',
      resuelta: new Date().toISOString(),
    });
  }

  store.descontarSaldo(t.origen, t.monto);
  store.acreditarSaldo(t.destino, t.monto);

  return store.actualizarTransferencia(t.id, {
    estado: 'aprobada',
    motivo: 'Transferencia completada correctamente.',
    resuelta: new Date().toISOString(),
  });
}
