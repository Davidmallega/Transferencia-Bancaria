function Estado({ estado }) {
  if (estado === 'validando') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-info-bg px-2.5 py-1 text-xs font-medium text-info">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-info" />
        En validación
      </span>
    );
  }
  if (estado === 'aprobada') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-1 text-xs font-medium text-success">
        ✓ Aprobada
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-error-bg px-2.5 py-1 text-xs font-medium text-error">
      ✗ Rechazada
    </span>
  );
}

function hora(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function Historial({ transferencias }) {
  if (transferencias.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border-strong bg-surface py-12 text-center">
        <div className="mb-2 text-3xl">🏦</div>
        <p className="text-sm text-text-muted">No hay transferencias todavía.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-text-muted">
            <th className="px-4 py-3 font-medium">Movimiento</th>
            <th className="px-4 py-3 font-medium">Monto</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Hora</th>
          </tr>
        </thead>
        <tbody>
          {transferencias.map((t) => (
            <tr key={t.id} className="border-b border-border last:border-0">
              <td className="px-4 py-3">
                <span className="font-mono">{t.origen} → {t.destino}</span>
                {t.motivo && t.estado === 'rechazada' && (
                  <p className="mt-0.5 text-xs text-error">{t.motivo}</p>
                )}
              </td>
              <td className="px-4 py-3 font-medium">${t.monto.toLocaleString()}</td>
              <td className="px-4 py-3"><Estado estado={t.estado} /></td>
              <td className="px-4 py-3 font-mono text-xs text-text-muted">
                {hora(t.resuelta || t.creada)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
