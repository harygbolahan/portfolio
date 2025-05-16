"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    position: "Senior Full Stack Developer",
    company: "TechNova Solutions",
    period: "2021 - Present",
    location: "Lagos, Nigeria",
    description: [
      "Lead a team of 5 developers in building enterprise-level web applications using React, Node.js, and MongoDB",
      "Implemented CI/CD pipelines that reduced deployment time by 40%",
      "Architected and developed a financial management system for a major Nigerian bank",
      "Mentored junior developers and conducted code reviews to ensure code quality",
    ],
  },
  {
    position: "Full Stack Developer",
    company: "AfriTech Innovations",
    period: "2019 - 2021",
    location: "Lagos, Nigeria",
    description: [
      "Developed and maintained multiple web applications using React, Express, and PostgreSQL",
      "Built RESTful APIs for mobile applications serving over 50,000 users",
      "Collaborated with UI/UX designers to implement responsive designs",
      "Optimized database queries resulting in a 30% improvement in application performance",
    ],
  },
  {
    position: "Frontend Developer",
    company: "Digital Solutions Ltd",
    period: "2017 - 2019",
    location: "Abuja, Nigeria",
    description: [
      "Created responsive user interfaces using React and Redux",
      "Implemented unit and integration tests using Jest and React Testing Library",
      "Collaborated with backend developers to integrate frontend with APIs",
      "Participated in agile development processes including daily standups and sprint planning",
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="experience" className="py-20 md:py-32 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey as a developer, working with diverse teams and technologies to deliver impactful
            solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          {experiences.map((exp, index) => (
            <motion.div key={`${exp.company}-${index}`} variants={itemVariants} className="mb-12 relative pl-8 md:pl-0">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                  </div>
                  <div className="text-primary font-medium mb-1">{exp.company}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>
                  <div className="text-sm text-muted-foreground">{exp.location}</div>
                </div>

                <div className="md:w-2/3">
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {index < experiences.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-px bg-border md:left-1/3 md:ml-[-1px] md:top-12"></div>
              )}
              <div className="absolute left-4 top-1.5 w-2 h-2 rounded-full bg-primary md:left-1/3 md:ml-[-4px] md:top-5"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

