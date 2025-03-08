import { defineStore } from 'pinia';

import state, { type AuthState } from './state'
import getters from './getters'
import * as actions from './actions'

export const useAuthStore = defineStore<'auth', AuthState>('auth', {
  state,
  getters,
  actions: {
    ...actions
  }
});
