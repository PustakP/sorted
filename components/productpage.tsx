"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const images = [
    "https://placehold.co/600x800",
    "https://placehold.co/600x800/orange/white",
    "https://placehold.co/600x800/black/yellow",
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
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
                    onClick={() => setSelectedImage(index)}
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
              <h1 className="text-2xl md:text-3xl font-bold">Acme Prism T-Shirt</h1>
              <p className="text-muted-foreground">60% cotton, 40% polyester</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Product Details</h2>
              <p className="text-muted-foreground">
                The Acme Prism T-Shirt is a stylish and comfortable piece of clothing that features a unique
                prism-inspired design. Made with a blend of 60% combed ringspun cotton and 40% polyester, this tee
                offers a soft and breathable feel.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16 border">
                  <AvatarImage src="https://placehold.co/250" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-muted-foreground">Acme Clothing Co.</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">See others by this seller</Button>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Price</h2>
              <div className="text-3xl font-bold">$99</div>
            </div>
            <Button size="lg" className="w-full text-lg py-6">Add to Cart</Button>
          </div>
        </div>
      </main>
    </div>
  )
}