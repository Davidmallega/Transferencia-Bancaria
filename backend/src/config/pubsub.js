import { PubSub } from '@google-cloud/pubsub';

export const pubsub = new PubSub();

export const TOPIC_NAME = process.env.TOPIC_NAME || 'transferencias';
export const SUBSCRIPTION_NAME = process.env.SUBSCRIPTION_NAME || 'transferencias-sub';
export const LIMITE_TRANSFERENCIA = Number(process.env.LIMITE_TRANSFERENCIA) || 10000;
