"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Navbar } from "@/components/navbar2"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Product {
  id: number
  name: string
  price: number
  image_link: string
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('images')
        .select('id, name, price, image_link')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-6 min-h-24 max-h-fit">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Our Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="flex flex-col bg-muted rounded-sm hover:bg-accent border-2 hover:border-4 cursor-pointer">
                <img
                  src={product.image_link}
                  alt={product.name}
                  className="aspect-square object-cover rounded-lg w-full mb-2 p-2"
                />
                <h2 className="text-lg font-semibold px-2">{product.name}</h2>
                <p className="text-muted-foreground mb-2 px-2">INR {product.price} /-</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}