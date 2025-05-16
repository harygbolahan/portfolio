"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

export default function About() {
  const containerRef = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])

  const skills = [
    "React",
    "Next.js",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "UI/UX",
    "AWS",
  ]

  return (
    <section id="about" ref={containerRef} className="py-20 md:py-32 relative overflow-hidden noise-bg">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-background to-design-accent3/5 dark:from-background dark:via-background dark:to-design-accent3/10"></div>

      {/* Diagonal decorative element */}
      <div className="absolute inset-0 diagonal-box opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
        >
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-block mb-6">
                <h2 className="text-3xl md:text-5xl font-bold relative">
                  <span className="relative z-10">About Me</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-2 left-0 h-3 bg-design-accent1/20 dark:bg-design-accent1/30 -z-0"
                  />
                </h2>
              </div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-lg mb-4 leading-relaxed">
                  Hello! I'm <span className="font-semibold text-design-accent1">Mubarak</span>, a passionate Full
                  Stack Developer based in Lagos, Nigeria with over 3 years of experience crafting digital solutions
                  that make an impact.
                </p>

                <p className="text-lg mb-4 leading-relaxed">
                  I specialize in building <span className="font-semibold text-design-accent2">responsive</span>,{" "}
                  <span className="font-semibold text-design-accent1">user-friendly</span> applications using modern
                  technologies. My approach combines technical expertise with creative problem-solving and a keen eye
                  for design.
                </p>

                <p className="text-lg mb-6 leading-relaxed">
                  When I'm not coding, you can find me mentoring junior developers, contributing to open-source
                  projects, or exploring the latest technologies to stay at the cutting edge of web development.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {skills.map((skill, index) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-background border border-border shadow-sm"
                      style={{
                        borderColor:
                          index % 3 === 0
                            ? "rgba(255, 94, 91, 0.3)"
                            : index % 3 === 1
                              ? "rgba(0, 206, 203, 0.3)"
                              : "rgba(255, 237, 102, 0.3)",
                        color:
                          index % 3 === 0
                            ? "var(--design-accent1)"
                            : index % 3 === 1
                              ? "var(--design-accent2)"
                              : "var(--design-accent3)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-full bg-design-accent2 hover:bg-design-accent2/90 text-white" asChild>
                    <Link href="/resume.pdf" target="_blank">
                      <Download className="mr-2 h-4 w-4" /> Download Resume
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-full border-design-accent3 text-design-accent3 hover:bg-design-accent3/10"
                    asChild
                  >
                    <Link href="#projects">
                      <ExternalLink className="mr-2 h-4 w-4" /> View Projects
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 order-1 md:order-2"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl border-2 border-dashed border-design-accent1/30 dark:border-design-accent1/20 -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full rounded-2xl border-2 border-dashed border-design-accent2/30 dark:border-design-accent2/20 -z-10"></div>

              {/* Floating shapes */}
              <motion.div
                style={{ y: y1 }}
                className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-design-accent1/20 dark:bg-design-accent1/10 blur-xl"
              />
              <motion.div
                style={{ y: y2 }}
                className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-design-accent2/20 dark:bg-design-accent2/10 blur-xl"
              />
              <motion.div
                style={{ y: y3 }}
                className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-design-accent3/20 dark:bg-design-accent3/10 blur-xl"
              />

              {/* Main image */}
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-design-accent1/20 via-transparent to-design-accent2/20 z-10"></div>
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Mubarak Oyekanmi"
                  width={600}
                  height={600}
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative pattern */}
              <div className="absolute -z-10 w-full h-full top-0 left-0 grid-pattern opacity-70"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

