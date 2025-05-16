"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Database, Layout, Server, Smartphone, Terminal } from "lucide-react"

const skills = [
  {
    category: "Frontend",
    icon: <Layout className="w-6 h-6" />,
    colorClass: "text-design-accent1 bg-design-accent1/10",
    borderClass: "border-design-accent1/20",
    bgClass: "bg-design-accent1/10",
    dotClass: "bg-design-accent1",
    items: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Redux", "HTML/CSS"],
  },
  {
    category: "Backend",
    icon: <Server className="w-6 h-6" />,
    colorClass: "text-design-accent2 bg-design-accent2/10",
    borderClass: "border-design-accent2/20",
    bgClass: "bg-design-accent2/10",
    dotClass: "bg-design-accent2",
    items: ["Node.js", "Express", "NestJS", "REST APIs"],
  },
  {
    category: "Database",
    icon: <Database className="w-6 h-6" />,
    colorClass: "text-design-accent3 bg-design-accent3/10",
    borderClass: "border-design-accent3/20",
    bgClass: "bg-design-accent3/10",
    dotClass: "bg-design-accent3",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Mongoose"],
  },
  {
    category: "Mobile",
    icon: <Smartphone className="w-6 h-6" />,
    colorClass: "text-design-accent1 bg-design-accent1/10",
    borderClass: "border-design-accent1/20",
    bgClass: "bg-design-accent1/10",
    dotClass: "bg-design-accent1",
    items: ["React Native", "Expo", "Progressive Web Apps"],
  },
  {
    category: "DevOps",
    icon: <Terminal className="w-6 h-6" />,
    colorClass: "text-design-accent2 bg-design-accent2/10",
    borderClass: "border-design-accent2/20",
    bgClass: "bg-design-accent2/10",
    dotClass: "bg-design-accent2",
    items: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Vercel", "Netlify"],
  },
  {
    category: "Tools",
    icon: <Code2 className="w-6 h-6" />,
    colorClass: "text-design-accent3 bg-design-accent3/10",
    borderClass: "border-design-accent3/20",
    bgClass: "bg-design-accent3/10",
    dotClass: "bg-design-accent3",
    items: ["Git", "VS Code", "Postman", "Figma", "Jira", "Notion"],
  },
]

export default function Skills() {
  const containerRef = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])
  const negRotate = useTransform(scrollYProgress, [0, 1], [0, -10])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="skills" ref={containerRef} className="py-20 md:py-32 relative overflow-hidden noise-bg">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-bl from-background via-background to-design-accent1/5 dark:from-background dark:via-background dark:to-design-accent1/10"></div>

      {/* Animated background shapes */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-design-accent1/5 dark:bg-design-accent1/10 blur-3xl"
      />
      <motion.div
        style={{ y: y2, rotate: negRotate }}
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-design-accent2/5 dark:bg-design-accent2/10 blur-3xl"
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
              <span className="relative z-10">Technical Expertise</span>
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-2 left-0 h-3 bg-design-accent2/20 dark:bg-design-accent2/30 -z-0"
              />
            </h2>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My toolkit spans the full development spectrum, enabling me to build complete, scalable solutions from
            concept to deployment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill) => (
            <motion.div key={skill.category} variants={itemVariants} className="hover-card">
              <div
                className={`bg-background rounded-xl p-6 shadow-lg border ${skill.borderClass} h-full relative overflow-hidden`}
              >
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 ${skill.bgClass} rounded-bl-3xl -mr-5 -mt-5`}></div>

                <div className="flex items-center gap-3 mb-4 relative">
                  <div className={`p-3 rounded-lg ${skill.colorClass}`}>{skill.icon}</div>
                  <h3 className="text-xl font-semibold">{skill.category}</h3>
                </div>

                <ul className="space-y-2 relative">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${skill.dotClass}`}></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative pattern */}
                <div className="absolute bottom-0 right-0 w-24 h-24 grid-pattern opacity-30"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

