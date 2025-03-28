import Router from "@/router";
import AuthRepository, { type User } from "../../repositories/Auth/AuthRepository";
import AuthorizationRepository from "@/repositories/Auth/AuthorizationRepository";

export type ActionsType = {
  login: (payload: { email: string; password: string; }) => Promise<void>;
  updateUser: (payload: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  getMercadoLivreAuthorizationLink: () => Promise<{ authorization_url: string; }>;
  getShopeeAuthorizationLink: () => Promise<{ authorization_url: string; }>;
};


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
      this.user = null
      this.token = null
      sessionStorage.removeItem(`USER`)
      sessionStorage.removeItem(`AUTH_TOKEN`)
      sessionStorage.removeItem(`AUTH_EXPIRATION`)
    })
}

export async function getMercadoLivreAuthorizationLink() {
  this.loading = true
  try {
    return await AuthorizationRepository.getMercadoLivreLink()
      .then(({ data }) => data)
      .finally(() => this.loading = false)
  } catch (error) {
    console.log('error :>> ', error);
  }
}

export async function getShopeeAuthorizationLink() {
  this.loading = true
  try {
    return await AuthorizationRepository.getShopeeLink()
      .then(({ data }) => data)
      .finally(() => this.loading = false)
  } catch (error) {
    console.log('error :>> ', error);
  }
}

export default {
  login,
  updateUser,
  logout,
  getMercadoLivreAuthorizationLink,
  getShopeeAuthorizationLink
} as unknown as ActionsType
