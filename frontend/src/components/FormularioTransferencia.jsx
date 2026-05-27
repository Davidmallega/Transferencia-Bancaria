import { useState } from 'react';

export function FormularioTransferencia({ cuentas, onTransferir, procesando }) {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [monto, setMonto] = useState('');
  const [error, setError] = useState(null);

  const enviar = async () => {
    setError(null);
    if (!origen || !destino) return setError('Selecciona cuenta origen y destino.');
    if (origen === destino) return setError('El origen y destino deben ser distintos.');
    if (!monto || Number(monto) <= 0) return setError('Ingresa un monto válido.');

    try {
      await onTransferir(origen, destino, Number(monto));
      setMonto('');
    } catch (err) {
      setError(err.message);
    }
  };

  const selectClase =
    'w-full rounded-sm border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

  return (
    <div className="rounded-md border border-border bg-surface p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold">Nueva transferencia</h2>
      <p className="mb-4 text-sm text-text-muted">
        Se validará de forma asíncrona vía Pub/Sub.
      </p>

      <div className="grid gap-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Cuenta origen</span>
          <select value={origen} onChange={(e) => setOrigen(e.target.value)} className={selectClase}>
            <option value="">Selecciona…</option>
            {cuentas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} · {c.nombre} (${c.saldo.toLocaleString()})
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Cuenta destino</span>
          <select value={destino} onChange={(e) => setDestino(e.target.value)} className={selectClase}>
            <option value="">Selecciona…</option>
            {cuentas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} · {c.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Monto (USD)</span>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="0"
            className={selectClase}
          />
          <span className="mt-1 block text-xs text-text-subtle">Límite por transferencia: $10,000</span>
        </label>

        {error && (
          <p className="rounded-sm bg-error-bg px-3 py-2 text-sm text-error">{error}</p>
        )}

        <button
          onClick={enviar}
          disabled={procesando}
          className="rounded-sm bg-brand-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {procesando ? 'Procesando…' : 'Transferir'}
        </button>
      </div>
    </div>
  );
}
