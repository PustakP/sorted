"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar2"
import { createClient } from '@supabase/supabase-js'

console.log('Initializing Supabase client')
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Product {
  id: number
  name: string
  price: number
  image_link: string
  image_link2: string
  image_link3: string
  user: string
  timest: string
}

export default function ProductPage() {
  console.log('Rendering ProductPage component')
  const params = useParams()
  const id = params?.prodID
  console.log('Product ID from params:', id)
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('useEffect triggered')
    async function fetchProduct() {
      if (!id) {
        console.error('No product ID provided')
        setError('No product ID provided')
        setLoading(false)
        return
      }

      console.log('Fetching product data for ID:', id)
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching product:', error)
        setError(error.message)
      } else if (!data) {
        console.error('No product found for ID:', id)
        setError('Product not found')
      } else {
        console.log('Product data fetched successfully:', data)
        setProduct(data)
      }
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  if (loading) {
    console.log('Loading state')
    return <div>Loading product...</div>
  }

  if (error) {
    console.log('Error state:', error)
    return <div>Error: {error}</div>
  }

  if (!product) {
    console.log('Product not found')
    return <div>Product not found</div>
  }

  console.log('Processing product images')
  const images = [product.image_link, product.image_link2, product.image_link3].filter(Boolean)

  console.log('Rendering product page')
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container mx-auto px-4 pt-6 min-h-24 max-h-fit ">
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={images[selectedImage]}
              alt="Product Image"
              className="aspect-square object-cover rounded-lg w-full"
            />
            <Tabs defaultValue="0" className="w-full mt-4 mb-24"> 
              <TabsList className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <TabsTrigger
                    key={index}
                    value={index.toString()}
                    onClick={() => {
                      console.log(`Selecting image ${index}`)
                      setSelectedImage(index)
                    }}
                    className="p-0"
                  >
                    <img
                      src={img}
                      alt={`Product Thumbnail ${index + 1}`}
                      className="aspect-square object-cover rounded-md w-full h-full"
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">Uploaded on: {new Date(product.timest).toLocaleDateString()}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Product Details</h2>
              <p className="text-muted-foreground">
                {/* Add product description if available in your database */}
                This is a placeholder for the product description. 
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16 border">
                  <AvatarImage src="https://placehold.co/250" />
                  <AvatarFallback>{product.user.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{product.user}</h3>
                  <p className="text-muted-foreground">Seller</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => console.log('See others by this seller clicked')}>
                See others by this seller
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Price</h2>
              <div className="text-3xl font-bold">INR {product.price} /-</div>
            </div>
            <Button size="lg" className="w-full text-lg py-6" onClick={() => console.log('Add to Cart clicked')}>
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}