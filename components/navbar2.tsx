'use client'

import Link from "next/link"
import { Package2, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSession, signIn, signOut } from "next-auth/react"

export function Navbar() {
  const { data: session } = useSession()

  const handleAuth = () => {
    if (session) {
      signOut()
    } else {
      signIn('google')
    }
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/orders', label: 'Sales' },
    // Add items, only visible when logged in
    ...(session ? [{ href: '/list', label: 'List' }] : []),
  ]

  const authButton = {
    label: session ? `Hi, ${session.user?.name}` : 'Log In',
    action: handleAuth,
  }

  const renderNavItems = (isMobile: boolean) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${
            isMobile
              ? 'flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted/50'
              : 'hidden md:block'
          }`}
        >
          {item.label}
        </Link>
      ))}
      <Button
        onClick={authButton.action}
        className={`${
          isMobile
            ? 'flex items-center gap-2 px-2 py-1 border-2 rounded-md hover:bg-accent bg-muted text-foreground'
            : 'hidden md:block border-2 rounded-md px-2 py-1 hover:bg-muted bg-accent text-foreground'
        }`}
      >
        {authButton.label}
      </Button>
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-12">
      <div className="container flex h-14 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Package2 className="h-6 w-6" /> 
                <span className="font-bold">Sorted</span>
              </Link>
              {renderNavItems(true)}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2">
          <Package2 className="h-6 w-6" /> 
          <span className="font-bold">Sorted</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-4">
          {renderNavItems(false)}
        </nav>
      </div>
    </header>
  )
}