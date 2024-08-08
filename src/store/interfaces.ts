import { Product } from '@/views/interfaces'

export interface ProductState {
  products: Array<Product>
  productDetail: Product
  allProducts: Array<Product>
  categories: Array<string>
  isLoading: boolean
}

export interface RootState {
  products: ProductState
}
