import { useProducts } from './useProducts'

export default function ProductsPage() {
  const { data, isPending, error } = useProducts()

  if (isPending) return <p>Loading...</p>
  if (error) return <p>Could not load products.</p>

  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>
          {p.name} - {p.price}
        </li>
      ))}
    </ul>
  )
}
