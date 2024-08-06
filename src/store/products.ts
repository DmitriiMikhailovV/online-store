import { Module } from 'vuex'
import axios from 'axios'
import { ProductState } from './interfaces'

const state: ProductState = {
  products: [],
  categories: [],
}

const products: Module<ProductState, any> = {
  namespaced: true,
  state,
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('https://fakestoreapi.com/products')

      commit('SET_PRODUCTS', response.data)
    },
    async fetchCategories({ commit }) {
      const response = await axios.get(
        'https://fakestoreapi.com/products/categories'
      )
      commit('SET_CATEGORIES', response.data)
    },
  },
}

export default products
