// routes/transferencias.js
import { Router } from 'express';
import {
  listarCuentas,
  listarTransferencias,
  obtenerTransferencia,
  crearTransferencia,
} from '../controllers/transferenciasController.js';

const router = Router();

router.get('/cuentas', listarCuentas);
router.get('/transferencias', listarTransferencias);
router.get('/transferencias/:id', obtenerTransferencia);
router.post('/transferencias', crearTransferencia);

export default router;
