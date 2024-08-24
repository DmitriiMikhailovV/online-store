export interface Token {
  sub: number
  user: string
  iat: number
}

export interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: Rating
}

export interface Rating {
  count: number
  rate: number
}

export interface RootState {
  products: ProductsState
  users: UsersState
}

export interface ProductsState {
  products: Array<Product>
  productDetail: Product | null
  productCart: Array<Product & { quantity: number }>
  userCart: UserCart | null
  purchasedUserCarts: Array<UserCart>
  allProducts: Array<Product>
  categories: Array<string>
  isLoading: boolean
}

export interface UsersState {
  signedInUser: User | null
  token: string
  isLoading: boolean
}

export interface UserCart {
  user: User
  cart: Array<Product & { quantity: number }>
}

export interface User {
  id: number
  email: string
  username: string
  password: string
  first_name: string
  last_name: string
}
