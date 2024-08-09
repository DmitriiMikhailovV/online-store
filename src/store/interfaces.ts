import { Product } from '@/views/interfaces'

export interface ProductState {
  products: Array<Product>
  productDetail: Product
  productCart: Array<Product & { quantity: number }>
  allProducts: Array<Product>
  categories: Array<string>
  isLoading: boolean
}

export interface RootState {
  products: ProductState
}
