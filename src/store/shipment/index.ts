import { defineStore } from 'pinia';

import state from './state'
import getters from './getters'
import * as actions from './actions'
import type { Action, State } from '@/store/types';
import type { Shipment } from '@/repositories/Shipment/ShipmentRepository';

export const useShipmentStore = defineStore<'shipment', State<Shipment>, {}, Action<Shipment>>('shipment', {
  state,
  getters,
  actions: {
    ...actions as unknown as Action<Shipment>
  }
});
