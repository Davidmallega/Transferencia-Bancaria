function formatearDinero(monto) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(monto);
}

export function PanelCuentas({ cuentas }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cuentas.map((cuenta) => (
        <div
          key={cuenta.id}
          className="rounded-md border border-border bg-surface p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-text-muted">Cuenta {cuenta.id}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
              {cuenta.id}
            </span>
          </div>
          <p className="mt-2 text-sm text-text-muted">{cuenta.nombre}</p>
          <p className="mt-1 text-2xl font-semibold text-text">
            {formatearDinero(cuenta.saldo)}
          </p>
        </div>
      ))}
    </div>
  );
}
