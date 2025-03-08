import type { AuthState } from "./state";

export default {
  // avatar: (state: AuthState) => state?.user?.photoURL,

  isLogged() { return this.getUser !== null && this.getUser !== undefined },

  getUser: (state: AuthState) => {
    if (!state.user && sessionStorage.getItem(`USER`))
      state.user = sessionStorage.getItem(`USER`) as AuthState['user']

    return state?.user
  },
}
