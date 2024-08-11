import { Module } from 'vuex'
import axios from 'axios'
import { UsersState, RootState } from './interfaces'
import { decodeToken } from '../utils/helpers'

const state: UsersState = {
  signedInUser: null,
  token: '',
  isLoading: false,
}

const products: Module<UsersState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    SET_SIGNED_IN_USER(state, signedInUser) {
      state.signedInUser = signedInUser
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    REGISTER_USER(state, user) {
      state.signedInUser = user
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
  },

  actions: {
    async loginUser({ commit }, payload) {
      commit('SET_LOADING', true)
      try {
        const responseToken = await axios.post(
          'https://fakestoreapi.com/auth/login',
          payload
        )
        const decodedToken = decodeToken(responseToken.data.token)
        const userId = decodedToken.sub

        const responseUser = await axios.get(
          `https://fakestoreapi.com/users/${userId}`
        )
        commit('SET_TOKEN', responseToken.data.token)
        commit('SET_SIGNED_IN_USER', responseUser.data)
      } catch (error) {
        console.error('Failed to log in', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async registerUser({ commit }, payload) {
      commit('SET_LOADING', true)
      try {
        //after registration must be sent token but this API does't return token
        await axios.post('https://fakestoreapi.com/users', payload)
        //below is imitation of login with token
        const responseToken = await axios.post(
          'https://fakestoreapi.com/auth/login',
          {
            username: payload.username,
            password: payload.password,
          }
        )
        const decodedToken = decodeToken(responseToken.data.token)
        const userId = decodedToken.sub
        const responseUser = await axios.get(
          `https://fakestoreapi.com/users/${userId}`
        )

        commit('SET_TOKEN', responseToken.data.token)
        commit('SET_SIGNED_IN_USER', responseUser.data)
      } catch (error) {
        console.error('Failed to register', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },
}

export default products
