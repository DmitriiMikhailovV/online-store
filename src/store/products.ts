import { Module } from 'vuex'
import axios from 'axios'
import { ProductsState, RootState } from './interfaces'
import { Product } from '@/views/interfaces'

const state: ProductsState = {
  products: [],
  allProducts: [],
  productDetail: null,
  productCart: [],
  categories: [],
  isLoading: false,
}

const products: Module<ProductsState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_ALL_PRODUCTS(state, allProducts) {
      state.allProducts = allProducts
    },
    SET_PRODUCT_DETAIL(state, productDetail) {
      state.productDetail = productDetail
    },
    SET_PRODUCT_CART(state, productCart) {
      state.productCart = productCart
    },
    UPDATE_CART_ITEM_QUANTITY(state, { index, quantity }) {
      state.productCart[index].quantity = quantity
    },
    REMOVE_CART_ITEM(state, index) {
      state.productCart.splice(index, 1)
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
  },
  actions: {
    async fetchProducts({ commit, state }, filters) {
      commit('SET_LOADING', true)
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
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchProductDetail({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        )
        commit('SET_PRODUCT_DETAIL', response.data)
      } catch (error) {
        console.error('Failed to fetch product detail:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchCategories({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(
          'https://fakestoreapi.com/products/categories'
        )
        commit('SET_CATEGORIES', response.data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    addToCart({ commit }, product) {
      let cart = state.productCart
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      )

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity
      } else {
        cart = [...state.productCart, product]
      }
      commit('SET_PRODUCT_CART', cart)
    },
    removeCartItem({ commit }, index) {
      commit('REMOVE_CART_ITEM', index)
    },
    updateCartItemQuantity({ commit }, { index, quantity }) {
      commit('UPDATE_CART_ITEM_QUANTITY', { index, quantity })
    },
  },
}

export default products
