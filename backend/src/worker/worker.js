import { pubsub, SUBSCRIPTION_NAME } from '../config/pubsub.js';
import { validarYResolver } from './validador.js';

const RETARDO_VALIDACION_MS = 2500;

export function iniciarWorker() {
  const suscripcion = pubsub.subscription(SUBSCRIPTION_NAME);

  suscripcion.on('message', (mensaje) => {
    try {
      const { id } = JSON.parse(mensaje.data.toString());
      console.log(`📨 Worker recibió transferencia ${id}, validando...`);

      setTimeout(() => {
        const resultado = validarYResolver(id);
        if (resultado) {
          console.log(`   → ${id}: ${resultado.estado.toUpperCase()} (${resultado.motivo})`);
        }
      }, RETARDO_VALIDACION_MS);

      mensaje.ack();
    } catch (error) {
      console.error('Error procesando mensaje:', error.message);
      mensaje.ack(); // ack en mensajes corruptos para no reintentar indefinidamente
    }
  });

  suscripcion.on('error', (error) => {
    console.error('Error en la suscripción Pub/Sub:', error.message);
  });

  console.log(`👷 Worker escuchando la suscripción "${SUBSCRIPTION_NAME}"`);
}
