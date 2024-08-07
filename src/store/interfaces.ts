import { Product } from '@/views/interfaces'

export interface ProductState {
  products: Array<Product>
  allProducts: Array<Product>
  categories: Array<string>
}

export interface RootState {
  products: ProductState
}
