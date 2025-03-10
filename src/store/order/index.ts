import { defineStore } from 'pinia';

import state from './state'
import getters from './getters'
import * as actions from './actions'
import type { State, Action } from '../types';
import type { Order } from '@/repositories/Order/OrderRepository';

export const useOrderStore = defineStore<'order', State<Order>, {}, Action<Order>>('order', {
  state,
  getters,
  actions: {
    ...actions as unknown as Action<Order>
  }
});
