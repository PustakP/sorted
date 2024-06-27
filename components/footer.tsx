import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <>
    <div className="pt-24">
    <Separator />
    <footer className="bg-muted text-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/products" className="hover:underline">Products</Link></li>
              <li><Link href="/sellers" className="hover:underline">Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:underline">Our Story</Link></li>
              <li><Link href="/team" className="hover:underline">Team</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary"><Twitter size={24} /></a>
              <a href="#" className="text-foreground hover:text-primary"><Instagram size={24} /></a>
              <a href="#" className="text-foreground hover:text-primary"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Sorted. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-2 md:mt-0">
            Made with <Heart size={16} className="mx-1 text-red-500" /> by Pustak
          </p>
        </div>
      </div>
    </footer>
    </div>
    </>
  )
}