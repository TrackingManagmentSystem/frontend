import { defineStore } from 'pinia';

import state, { type AuthState } from './state'
import getters from './getters'
import actions from './actions'
import type { ActionsType } from './actions'

export const useAuthStore = defineStore<'auth', AuthState, {}, ActionsType>('auth', {
  state,
  getters,
  actions,
});
