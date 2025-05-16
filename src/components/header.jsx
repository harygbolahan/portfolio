"use client"

import { useState, useEffect } from "react"
import { Frame, Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { GetQuoteDialog } from "@/components/get-quote-dialog"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-design-accent1 to-design-accent2 rounded-full blur opacity-70"></div>
              <div className="relative p-2 bg-background rounded-full">
                <Frame className="w-5 h-5 text-design-accent1" />
              </div>
            </div>
            <span
              className={`transition-opacity duration-300 ${scrolled || isMobile ? "opacity-100" : "opacity-0"} font-bold text-gradient`}
            >
              Mubarak
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-design-accent1 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-design-accent1 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="hidden md:block">
              <GetQuoteDialog />
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
              <Menu className="w-5 h-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-16 px-4 border-b">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-design-accent1 to-design-accent2 rounded-full blur opacity-70"></div>
                    <div className="relative p-2 bg-background rounded-full">
                      <Frame className="w-5 h-5 text-design-accent1" />
                    </div>
                  </div>
                  <span className="font-bold text-gradient">Mubarak</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              <nav className="flex flex-col px-4 py-8 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={item.href}
                  >
                    <Link
                      href={item.href}
                      className="text-lg font-medium py-2 hover:text-design-accent1 transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <div className="h-px bg-border mt-2"></div>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto p-4 border-t">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <GetQuoteDialog variant="mobile" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

