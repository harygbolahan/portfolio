"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowDown, ExternalLink, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GetQuoteDialog } from "@/components/get-quote-dialog"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const [dots, setDots] = useState([])

  useEffect(() => {
    // Generate random dots only on client side - increased from 50 to 150
    const dotsArray = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: i % 3 === 0 ? "#FF5E5B" : i % 3 === 1 ? "#00CECB" : "#FFED66",
      animationDelay: Math.random() * 5,
      animationDuration: Math.random() * 3 + 2
    }))
    setDots(dotsArray)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden noise-bg"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-design-accent2/5 dark:from-background dark:via-background dark:to-design-accent1/10"></div>

      {/* Animated shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-design-accent1/10 dark:bg-design-accent1/5 blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-design-accent2/10 dark:bg-design-accent2/5 blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-design-accent3/10 dark:bg-design-accent3/5 blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-70"></div>

      {/* Interactive dots - client-side only rendering */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {dots.map((dot) => {
          const distance = heroRef.current ? calculateDistance(
            mousePosition.x,
            mousePosition.y,
            (dot.x / 100) * heroRef.current.offsetWidth,
            (dot.y / 100) * heroRef.current.offsetHeight
          ) : 1000
          const size = Math.max(dot.size, 8 - distance / 100)
          const opacity = Math.max(0.2, 0.8 - distance / 1000)

          return (
            <circle
              key={dot.id}
              cx={`${dot.x}%`}
              cy={`${dot.y}%`}
              r={size}
              fill={dot.color}
              opacity={opacity}
              style={{
                animation: `float ${dot.animationDuration}s ease-in-out infinite`,
                animationDelay: `${dot.animationDelay}s`
              }}
            />
          )
        })}
      </svg>

      {/* Floating sparkles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Confetti particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`confetti-${i}`}
            className="absolute"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              backgroundColor: i % 3 === 0 ? "#FF5E5B" : i % 3 === 1 ? "#00CECB" : "#FFED66",
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: -20, rotate: 0, opacity: 0 }}
            animate={{
              y: "110vh",
              rotate: Math.random() * 360,
              opacity: [0, 1, 1, 0],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 8,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative elements */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            className="absolute -top-20 -left-20 md:-top-32 md:-left-32 w-40 h-40 md:w-64 md:h-64 rounded-full bg-design-accent1/20 dark:bg-design-accent1/10 blur-xl"
          />

          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tighter">
                <span className="text-gradient">Mubarak Oyekanmi</span>
              </h1>

              <div className="relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1.5 }}
                  className="h-px bg-gradient-to-r from-design-accent1 via-design-accent2 to-design-accent3 absolute bottom-0 left-0"
                />
                <h2 className="text-2xl md:text-3xl font-medium pb-2 inline-block">Creative Full Stack Developer</h2>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Crafting digital experiences that blend{" "}
              <span className="text-design-accent1 font-medium">innovation</span>,
              <span className="text-design-accent2 font-medium"> functionality</span>, and
              <span className="text-design-accent3 font-medium"> aesthetics</span>. Based in Ede, Osun State, Nigeria.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-design-accent1 hover:bg-design-accent1/90 text-white rounded-full px-8"
                asChild
              >
                <Link href="#projects" className="flex items-center gap-2">
                  View My Work <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>

              <GetQuoteDialog />

              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-design-accent2 text-design-accent2 hover:bg-design-accent2/10 px-8"
                asChild
              >
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex justify-center gap-6 mt-12"
            >
              <Link
                href="https://github.com/harygbolahan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background border border-border hover:border-design-accent1 hover:text-design-accent1 transition-colors shadow-md"
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background border border-border hover:border-design-accent2 hover:text-design-accent2 transition-colors shadow-md"
              >
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background border border-border hover:border-design-accent3 hover:text-design-accent3 transition-colors shadow-md"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10"
      >
        <Link
          href="#about"
          className="flex flex-col items-center text-muted-foreground hover:text-design-accent1 transition-colors"
        >
          <span className="text-sm mb-2">Discover More</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}

