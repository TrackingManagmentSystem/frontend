import Router from "@/router";
import AuthRepository, { type User } from "../../repositories/Auth/AuthRepository";
import AuthorizationRepository from "@/repositories/Auth/AuthorizationRepository";
import type { ActionsType, StateType } from "./types";

export async function login(this: StateType, payload: { email: string; password: string; }) {
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
            Router.push({ name: `Orders` })
          })
      })

  } catch (error) {
    console.log('error :>> ', error);
  }
  this.loading = false
}

export async function register(this: StateType, payload: { email: string; password: string; firstName: string; lastName: string; }) {
  this.loading = true
  try {
    return await AuthRepository.register(payload)
      .then(({ data: { accessToken } }) => {
        this.token = accessToken;
        sessionStorage.setItem(`AUTH_TOKEN`, accessToken)

        AuthRepository.me()
          .then(({ data }) => {
            this.user = data;
            sessionStorage.setItem(`USER`, JSON.stringify(data))
            Router.push({ name: `Orders` })
          })
      })

  } catch (error) {
    console.log('error :>> ', error);
  }
  this.loading = false
}

export async function updateUser(this: StateType, payload: Partial<User>) {
  this.loading = true
  try {
    await AuthRepository.update(payload)
      .then(({ data }) => {
        this.user = data;
        sessionStorage.setItem(`USER`, JSON.stringify(data))
      })

  } catch (error) {
    console.log('error :>> ', error);
  }
  this.loading = false
}

export async function logout(this: StateType) {
  return AuthRepository.logout()
    .then(() => {
      this.user = null
      this.token = null
      sessionStorage.removeItem(`USER`)
      sessionStorage.removeItem(`AUTH_TOKEN`)
      sessionStorage.removeItem(`AUTH_EXPIRATION`)
    })
}

export async function getAuthorizationLink(this: StateType, platform: string) {
  this.loading = true
  try {
    return await AuthorizationRepository.getAuthorizationUrl(platform)
      .then(({ data }) => data)
      .finally(() => this.loading = false)
  } catch (error) {
    console.log('error :>> ', error);
  }
}

export async function parseCodeToAccessToken(
  this: StateType,
  payload: { platform: string; params: Record<string, any> }
) {
  this.loading = true
  try {
    return await AuthorizationRepository.parseCodeToAccessToken(payload)
      .then(({ data: { accessToken } }) => accessToken)
      .finally(() => this.loading = false)
  } catch (error) {
    console.log('error :>> ', error);
  }
}

export default {
  login,
  register,
  updateUser,
  logout,
  getAuthorizationLink,
  parseCodeToAccessToken
} as unknown as ActionsType
