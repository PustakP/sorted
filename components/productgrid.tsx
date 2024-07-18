"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Navbar } from "@/components/navbar2"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const products: Product[] = [
  { id: 1, name: "Product 1", price: 99, image: "https://placehold.co/300x400" },
  { id: 2, name: "Product 2", price: 129, image: "https://placehold.co/300x400/orange/white" },
  { id: 3, name: "Product 3", price: 79, image: "https://placehold.co/300x400/black/yellow" },
  { id: 4, name: "Product 4", price: 149, image: "https://placehold.co/300x400/green/white" },
  { id: 5, name: "Product 5", price: 89, image: "https://placehold.co/300x400/blue/white" },
  // Add more products as needed
]

export default function ProductGrid() {
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
                  src={product.image}
                  alt={product.name}
                  className="aspect-square object-cover rounded-lg w-full mb-2 p-2"
                />
                <h2 className="text-lg font-semibold px-2">{product.name}</h2>
                <p className="text-muted-foreground mb-2 px-2">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}