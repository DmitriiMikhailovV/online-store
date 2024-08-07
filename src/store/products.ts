import { Module } from 'vuex'
import axios from 'axios'
import { ProductState, RootState } from './interfaces'
import { Product } from '@/views/interfaces'

const state: ProductState = {
  products: [],
  allProducts: [],
  categories: [],
}

const products: Module<ProductState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_ALL_PRODUCTS(state, products) {
      state.allProducts = products
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
  },
  actions: {
    async fetchProducts({ commit, state }, filters) {
      try {
        if (filters && filters.category !== '') {
          const response = await axios.get(
            `https://fakestoreapi.com/products/category/${filters.category}`
          )
          commit('SET_PRODUCTS', response.data)
        } else {
          if (state.allProducts.length === 0) {
            const response = await axios.get(
              'https://fakestoreapi.com/products'
            )
            commit('SET_ALL_PRODUCTS', response.data)
          }

          let filteredProducts = state.allProducts

          if (filters && filters.search !== '') {
            const searchQuery = filters.search.toLowerCase()
            filteredProducts = state.allProducts.filter((product: Product) =>
              product.title.toLowerCase().includes(searchQuery)
            )
          }

          commit('SET_PRODUCTS', filteredProducts)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    },
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get(
          'https://fakestoreapi.com/products/categories'
        )
        commit('SET_CATEGORIES', response.data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    },
  },
}

export default products
