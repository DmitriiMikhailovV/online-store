import { Module } from 'vuex'
import axios from 'axios'
import { decodeToken } from '@/utils/helpers'
import { UsersState, RootState } from '@/utils/interfaces'

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
    async loginUser({ commit, dispatch, state, rootState }, payload) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/token`,
          {
            username: payload.username,
            password: payload.password,
          }
        )
        commit('SET_TOKEN', response.data.access)
        commit('SET_SIGNED_IN_USER', response.data.user)

        const cart = rootState.products.productCart

        if (cart.length > 0) {
          const userCart = {
            user: state.signedInUser,
            cart: cart,
          }
          dispatch('products/setUserCart', userCart, { root: true })
        }
      } catch (error) {
        console.error('Failed to log in', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async registerUser({ commit }, payload) {
      commit('SET_LOADING', true)
      try {
        await axios.post(`${process.env.VUE_APP_BASE_URL}/register/`, payload)
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/token`,
          {
            username: payload.username,
            password: payload.password,
          }
        )
        commit('SET_TOKEN', response.data.access)
        commit('SET_SIGNED_IN_USER', response.data.user)
      } catch (error) {
        console.error('Failed to register', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },
}

export default products
