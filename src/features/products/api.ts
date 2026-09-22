import { z } from 'zod'
import { api } from '@/lib/api'
import { productSchema, type Product } from './types'

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get('/products')
  return z.array(productSchema).parse(data) // validates server data
}
