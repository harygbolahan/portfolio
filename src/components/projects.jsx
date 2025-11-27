"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "PocketFi",
    description:
      "Modern financial infrastructure platform providing seamless payment APIs, virtual accounts, and comprehensive financial tools to help businesses collect, manage, and disburse funds efficiently. Features include admin dashboard for complete financial oversight.",
    image: "/projects/pocketfi.png",
    tags: ["React", "Node.js", "Payment APIs", "Virtual Accounts", "Admin Dashboard"],
    liveUrl: "https://pocketfi.ng/",
    textColorClass: "text-design-accent1",
    bgColorClass: "bg-design-accent1",
    bgGradientClass: "from-design-accent1/20",
    borderColorClass: "border-design-accent1/20",
    hoverBgClass: "hover:bg-design-accent1/10",
    badgeBgClass: "bg-design-accent1/10",
    badgeTextClass: "text-design-accent1",
    badgeBorderClass: "border-design-accent1/20",
  },
  {
    title: "Eterna Guardians",
    description:
      "Comprehensive personal safety application with real-time GPS tracking, emergency SOS alerts, safety check-ins, and 24/7 monitoring. Features include automatic emergency notifications to contacts, live location sharing, anti-theft protection, and complete admin dashboard for safety management.",
    image: "/projects/eternaguardians.png",
    tags: ["React", "GPS Tracking", "Real-time Alerts", "WebRTC", "Admin Dashboard"],
    liveUrl: "https://eternaguardians.com/",
    textColorClass: "text-design-accent2",
    bgColorClass: "bg-design-accent2",
    bgGradientClass: "from-design-accent2/20",
    borderColorClass: "border-design-accent2/20",
    hoverBgClass: "hover:bg-design-accent2/10",
    badgeBgClass: "bg-design-accent2/10",
    badgeTextClass: "text-design-accent2",
    badgeBorderClass: "border-design-accent2/20",
  },
  {
    title: "BPayment",
    description:
      "Secure payment gateway and financial solutions platform offering payment processing, virtual accounts, QR payments, and payment links. Features 99.9% uptime, flexible settlement options, and comprehensive admin dashboard for transaction management and analytics.",
    image: "/projects/bpayment.png",
    tags: ["React", "Payment Gateway", "Virtual Accounts", "QR Payments", "Admin Dashboard"],
    liveUrl: "https://bpayment.co/",
    textColorClass: "text-design-accent3",
    bgColorClass: "bg-design-accent3",
    bgGradientClass: "from-design-accent3/20",
    borderColorClass: "border-design-accent3/20",
    hoverBgClass: "hover:bg-design-accent3/10",
    badgeBgClass: "bg-design-accent3/10",
    badgeTextClass: "text-design-accent3",
    badgeBorderClass: "border-design-accent3/20",
  },
  {
    title: "Boomgator AI",
    description:
      "AI-powered property management system featuring automated task management, AI chat for instant guest responses, intelligent review monitoring, and smart booking optimization. Includes comprehensive admin dashboard for complete property operations oversight.",
    image: "/projects/boomgator.png",
    tags: ["AI/ML", "React", "Automation", "Property Management", "Admin Dashboard"],
    liveUrl: "https://ai.boomgator.com/",
    textColorClass: "text-design-accent1",
    bgColorClass: "bg-design-accent1",
    bgGradientClass: "from-design-accent1/20",
    borderColorClass: "border-design-accent1/20",
    hoverBgClass: "hover:bg-design-accent1/10",
    badgeBgClass: "bg-design-accent1/10",
    badgeTextClass: "text-design-accent1",
    badgeBorderClass: "border-design-accent1/20",
  },
  {
    title: "BPay",
    description:
      "Nigeria's #1 bill payment platform trusted by over 5 million users. Pay electricity, airtime, data, cable TV, internet bills and more instantly. Features cross-platform native Android and iOS applications with admin dashboard for complete payment infrastructure management.",
    image: "/projects/bpay.png",
    tags: ["React Native", "Flutter", "Payment Processing", "Mobile Apps", "Admin Dashboard"],
    liveUrl: "https://bpay.ng/",
    textColorClass: "text-design-accent2",
    bgColorClass: "bg-design-accent2",
    bgGradientClass: "from-design-accent2/20",
    borderColorClass: "border-design-accent2/20",
    hoverBgClass: "hover:bg-design-accent2/10",
    badgeBgClass: "bg-design-accent2/10",
    badgeTextClass: "text-design-accent2",
    badgeBorderClass: "border-design-accent2/20",
  },
  {
    title: "Newtimeplug",
    description:
      "Comprehensive bill payment application offering instant airtime recharge, data bundles, cable TV subscriptions (DStv, GOtv, Startimes), electricity bill payments, and airtime-to-cash services. Complete user dashboard redesign with enhanced UX and 24/7 customer support.",
    image: "/projects/newtimeplug.png",
    tags: ["React", "Payment Integration", "UI/UX Design", "Dashboard", "Real-time Processing"],
    liveUrl: "https://app.newtimeplug.com",
    textColorClass: "text-design-accent3",
    bgColorClass: "bg-design-accent3",
    bgGradientClass: "from-design-accent3/20",
    borderColorClass: "border-design-accent3/20",
    hoverBgClass: "hover:bg-design-accent3/10",
    badgeBgClass: "bg-design-accent3/10",
    badgeTextClass: "text-design-accent3",
    badgeBorderClass: "border-design-accent3/20",
  },
]

export default function Projects() {
  const containerRef = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="projects" ref={containerRef} className="py-20 md:py-32 relative overflow-hidden noise-bg">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-background to-design-accent2/5 dark:from-background dark:via-background dark:to-design-accent2/10"></div>

      {/* Animated background shapes */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-40 right-20 w-72 h-72 rounded-full bg-design-accent2/5 dark:bg-design-accent2/10 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-40 left-20 w-64 h-64 rounded-full bg-design-accent1/5 dark:bg-design-accent1/10 blur-3xl"
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <h2 className="text-3xl md:text-5xl font-bold relative">
              <span className="relative z-10">Featured Projects</span>
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-2 left-0 h-3 bg-design-accent3/20 dark:bg-design-accent3/30 -z-0"
              />
            </h2>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating my skills in creating innovative and user-friendly applications.
          </p>
        </motion.div>

        {/* Mobile view - Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.title} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`bg-background rounded-xl overflow-hidden shadow-lg border ${project.borderColorClass} hover-card`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.bgGradientClass} via-transparent to-transparent z-10`}
                      ></div>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-2 ${project.textColorClass}`}>{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className={`${project.badgeBgClass} ${project.badgeTextClass} border ${project.badgeBorderClass}`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <Button
                          size="sm"
                          className={`${project.bgColorClass} hover:${project.bgColorClass}/90 text-white`}
                          asChild
                        >
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            View Project <ArrowUpRight className="ml-1 w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline" size="icon" onClick={prevProject} className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
                <span className="sr-only">Previous project</span>
              </Button>
              <Button variant="outline" size="icon" onClick={nextProject} className="rounded-full">
                <ChevronRight className="w-5 h-5" />
                <span className="sr-only">Next project</span>
              </Button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${index === activeIndex ? "bg-design-accent1" : "bg-design-accent1/20"
                    }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop view - Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants} className="stacked-cards">
              <div
                className={`bg-background rounded-xl overflow-hidden shadow-lg border ${project.borderColorClass} stacked-card`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.bgGradientClass} via-transparent to-transparent z-10`}
                  ></div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${project.textColorClass}`}>{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className={`${project.badgeBgClass} ${project.badgeTextClass} border ${project.badgeBorderClass}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      size="sm"
                      className={`${project.bgColorClass} hover:${project.bgColorClass}/90 text-white`}
                      asChild
                    >
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        View Project <ArrowUpRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="rounded-full border-design-accent3 text-design-accent3 hover:bg-design-accent3/10"
            asChild
          >
            <Link href="#contact">
              <ArrowUpRight className="mr-2 w-4 h-4" /> Get In Touch For More Projects
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

