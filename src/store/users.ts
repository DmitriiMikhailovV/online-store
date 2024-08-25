import { Module } from 'vuex'
import axios from 'axios'
import { UsersState, RootState } from '@/utils/interfaces'
import { useToast } from 'vue-toastification'
import { AxiosError } from 'axios'

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
      const toast = useToast()
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
        toast.success('Login successful')
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(`Login failed: ${error.response?.data.detail}`)
        }
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async registerUser({ commit }, payload) {
      const toast = useToast()
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
        toast.success('Registration successful')
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(`Registration failed: ${error.response?.data.email}`)
          toast.error(`Registration failed: ${error.response?.data.username}`)
        }
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },
}

export default products
