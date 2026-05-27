import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../services/api.js';

export function useBanco() {
  const [cuentas, setCuentas] = useState([]);
  const [transferencias, setTransferencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [procesando, setProcesando] = useState(false);
  const pollingRef = useRef(null);

  const cargar = useCallback(async () => {
    try {
      setError(null);
      const [datosCuentas, datosTransf] = await Promise.all([
        api.listarCuentas(),
        api.listarTransferencias(),
      ]);
      setCuentas(datosCuentas.cuentas);
      setTransferencias(datosTransf.transferencias);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
    return () => clearInterval(pollingRef.current);
  }, [cargar]);

  const transferir = async (origen, destino, monto) => {
    try {
      setProcesando(true);
      setError(null);

      await api.crearTransferencia({ origen, destino, monto });
      await cargar();

      clearInterval(pollingRef.current);
      pollingRef.current = setInterval(async () => {
        const datos = await api.listarTransferencias();
        setTransferencias(datos.transferencias);
        const cuentasAct = await api.listarCuentas();
        setCuentas(cuentasAct.cuentas);

        const hayPendientes = datos.transferencias.some((t) => t.estado === 'validando');
        if (!hayPendientes) {
          clearInterval(pollingRef.current);
          setProcesando(false);
        }
      }, 1000);
    } catch (err) {
      setError(err.message);
      setProcesando(false);
      throw err;
    }
  };

  return { cuentas, transferencias, cargando, error, procesando, transferir, cargar };
}
