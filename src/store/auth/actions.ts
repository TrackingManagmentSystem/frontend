import Router from "@/router";
import AuthRepository, { type User } from "../../repositories/Auth/AuthRepository";

export async function login(payload: { email: string; password: string; }) {
  this.loading = true
  try {
    await AuthRepository.login(payload)
      .then(({ data: { accessToken } }) => {
        this.token = accessToken;
        sessionStorage.setItem(`AUTH_TOKEN`, accessToken)

        AuthRepository.me()
          .then(({ data }) => {
            this.user = data;
            sessionStorage.setItem(`USER`, JSON.stringify(data))
            Router.push({ name: `Ecommerce` })
          })
      })

  } catch (error) {
    console.log('error :>> ', error);
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;

    // The email of the user's account used.
    // const email = error.customData.email;

    // The AuthCredential type that was used.
    // const credential = provider.credentialFromError(error);
  }
  this.loading = false
}
export async function updateUser(payload: Partial<User>) {
  this.loading = true
  try {
    await AuthRepository.update(payload)
      .then(({ data }) => {
        this.user = data;
        sessionStorage.setItem(`USER`, JSON.stringify(data))
      })

  } catch (error) {
    console.log('error :>> ', error);
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;

    // The email of the user's account used.
    // const email = error.customData.email;

    // The AuthCredential type that was used.
    // const credential = provider.credentialFromError(error);
  }
  this.loading = false
}

export async function logout() {
  return AuthRepository.logout()
    .then(() => {
      sessionStorage.remove(`USER`)
      sessionStorage.remove(`AUTH_TOKEN`)
      sessionStorage.remove(`AUTH_EXPIRATION`)
      // this.router.push({ name: constants.routes.login.name })
    })
}
