let cuentas = [
  { id: 'A', nombre: 'Cuenta Corriente', saldo: 5000 },
  { id: 'B', nombre: 'Cuenta de Ahorro', saldo: 500 },
  { id: 'C', nombre: 'Cuenta Vista', saldo: 0 },
];

let transferencias = [];

export const store = {
  listarCuentas: () => cuentas,

  buscarCuenta: (id) => cuentas.find((c) => c.id === id),

  descontarSaldo: (id, monto) => {
    const cuenta = cuentas.find((c) => c.id === id);
    if (cuenta) cuenta.saldo -= monto;
  },

  acreditarSaldo: (id, monto) => {
    const cuenta = cuentas.find((c) => c.id === id);
    if (cuenta) cuenta.saldo += monto;
  },

  crearTransferencia: (datos) => {
    const transferencia = {
      id: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      origen: datos.origen,
      destino: datos.destino,
      monto: datos.monto,
      estado: 'validando',
      motivo: null,
      creada: new Date().toISOString(),
      resuelta: null,
    };
    transferencias.unshift(transferencia);
    return transferencia;
  },

  buscarTransferencia: (id) => transferencias.find((t) => t.id === id),

  listarTransferencias: () => transferencias,

  actualizarTransferencia: (id, cambios) => {
    const t = transferencias.find((t) => t.id === id);
    if (t) Object.assign(t, cambios);
    return t;
  },
};
