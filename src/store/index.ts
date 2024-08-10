import { createStore } from 'vuex'
import products from './products'
import users from './users'

export default createStore({
  modules: {
    products,
    users,
  },
})
