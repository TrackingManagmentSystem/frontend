import type { AuthState } from "./state";

export default {
  // avatar: (state: AuthState) => state?.user?.photoURL,

  isLogged() { return this.getUser !== null && this.getUser !== undefined },

  getUser: (state: AuthState) => {
    if (!state.user && sessionStorage.getItem(`USER`))
      state.user = JSON.parse(sessionStorage.getItem(`USER`) as string) as AuthState['user']

    if (!state.token && sessionStorage.getItem(`AUTH_TOKEN`))
      state.token = sessionStorage.getItem(`AUTH_TOKEN`)

    return state?.user
  },
}
