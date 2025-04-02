import type { StateType } from "./types";

export default {
  // avatar: (state: AuthState) => state?.user?.photoURL,

  isLogged() { return this.getUser !== null && this.getUser !== undefined },

  getUser: (state: StateType) => {
    if (!state.user && sessionStorage.getItem(`USER`))
      state.user = JSON.parse(sessionStorage.getItem(`USER`) as string) as StateType['user']

    if (!state.token && sessionStorage.getItem(`AUTH_TOKEN`))
      state.token = sessionStorage.getItem(`AUTH_TOKEN`)

    return state?.user
  },
}
