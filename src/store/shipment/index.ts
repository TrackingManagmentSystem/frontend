import { defineStore } from 'pinia';

import state from './state'
import getters from './getters'
import actions from './actions'
import type { ActionsType, GettersType, StateType } from './types';

export const useShipmentStore = defineStore<'shipment', StateType, GettersType, ActionsType>('shipment', {
  state,
  getters,
  actions
});
