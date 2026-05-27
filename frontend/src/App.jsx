import { useBanco } from './hooks/useBanco.js';
import { useTema } from './hooks/useTema.js';
import { PanelCuentas } from './components/PanelCuentas.jsx';
import { FormularioTransferencia } from './components/FormularioTransferencia.jsx';
import { Historial } from './components/Historial.jsx';

export default function App() {
  const { cuentas, transferencias, cargando, error, procesando, transferir } = useBanco();
  const { oscuro, alternar } = useTema();

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-lg text-white">
              🏦
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Banco Async</h1>
              <p className="font-mono text-xs text-text-muted">Pub/Sub</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-text-muted sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Validación asíncrona
            </span>
            <button
              onClick={alternar}
              className="rounded-md border border-border px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-2"
            >
              {oscuro ? '☀️ Claro' : '🌙 Oscuro'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {error && (
          <div className="mb-6 rounded-md border border-error/30 bg-error-bg p-4 text-sm text-error">
            {error}
          </div>
        )}

        <section className="mb-8">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
            Cuentas
          </h2>
          {cargando ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 animate-pulse rounded-md bg-surface-2" />
              ))}
            </div>
          ) : (
            <PanelCuentas cuentas={cuentas} />
          )}
        </section>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <aside>
            <FormularioTransferencia
              cuentas={cuentas}
              onTransferir={transferir}
              procesando={procesando}
            />
          </aside>

          <section>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-muted">
              Historial
            </h2>
            <Historial transferencias={transferencias} />
          </section>
        </div>
      </main>
    </div>
  );
}
