import { Module } from 'vuex'
import axios from 'axios'
import { ProductsState, RootState, Product } from '@/utils/interfaces'

const state: ProductsState = {
  products: [],
  allProducts: [],
  productDetail: null,
  productCart: [],
  userCart: null,
  purchasedUserCarts: [],
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
    SET_USER_CART(state, userCart) {
      state.userCart = userCart
    },
    SET_PURCHASED_CART(state, purchasedUserCarts) {
      state.purchasedUserCarts = purchasedUserCarts
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
        let products = []
        if (filters?.category) {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URL}/products/?category=${filters.category}`
          )
          products = response.data
        } else {
          if (state.allProducts.length === 0) {
            const response = await axios.get(
              `${process.env.VUE_APP_API_URL}/products`
            )
            commit('SET_ALL_PRODUCTS', response.data)
            products = response.data
          } else {
            products = state.allProducts
          }

          if (filters?.search) {
            const searchQuery = filters.search.toLowerCase()
            products = products.filter((product: Product) =>
              product.title.toLowerCase().includes(searchQuery)
            )
          }
        }
        commit('SET_PRODUCTS', products)
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
          `${process.env.VUE_APP_API_URL}/products/${id}`
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
          `${process.env.VUE_APP_API_URL}/categories`
        )
        commit('SET_CATEGORIES', response.data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    addToCart({ commit, state, rootState }, product) {
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

      const user = rootState.users.signedInUser
      if (user) {
        const userCart = {
          user: user,
          cart: cart,
        }

        commit('SET_USER_CART', userCart)
      }
    },
    removeCartItem({ commit, state, rootState }, index) {
      const updatedCart = state.productCart.filter((_, i) => i !== index)

      commit('SET_PRODUCT_CART', updatedCart)

      const user = rootState.users.signedInUser
      if (user) {
        const userCart = {
          user: user,
          cart: updatedCart,
        }

        commit('SET_USER_CART', userCart)
      }
    },
    updateCartItemQuantity({ commit, state, rootState }, { index, quantity }) {
      const productCart = state.productCart.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )

      commit('SET_PRODUCT_CART', productCart)

      const user = rootState.users.signedInUser
      if (user) {
        const userCart = {
          user: user,
          cart: productCart,
        }

        commit('SET_USER_CART', userCart)
      }
    },
    setUserCart({ commit }, userCart) {
      commit('SET_USER_CART', userCart)
    },
    setPurchasedCart({ commit, state }) {
      const purchaseDate = new Date().toISOString()
      const updatedUserCart = {
        ...state.userCart,
        purchaseDate,
      }
      const updatedPurchasedUserCarts = [
        ...state.purchasedUserCarts,
        updatedUserCart,
      ]
      commit('SET_PURCHASED_CART', updatedPurchasedUserCarts)
      commit('SET_PRODUCT_CART', [])
      commit('SET_USER_CART', null)
    },
  },
}

export default products
