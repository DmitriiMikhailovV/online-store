import { Product } from '@/views/interfaces'

export interface RootState {
  products: ProductsState
  users: UsersState
}

export interface ProductsState {
  products: Array<Product>
  productDetail: Product | null
  productCart: Array<Product & { quantity: number }>
  allProducts: Array<Product>
  categories: Array<string>
  isLoading: boolean
}

export interface UsersState {
  signedInUser: User | null
  token: string
  isLoading: boolean
}

export interface User {
  id: number
  email: string
  username: string
  password: string
  name: Name
}

export interface Name {
  firstname: string
  lastname: string
}
