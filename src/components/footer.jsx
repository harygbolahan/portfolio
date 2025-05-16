"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Frame, Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-4 border-t">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:items-start mb-8 md:mb-0"
          >
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Frame className="w-6 h-6" />
              <span>Mubarak Oyekanmi</span>
            </Link>
            <p className="text-muted-foreground text-center md:text-left">
              Full Stack Developer based in Lagos, Nigeria.
              <br />
              Building innovative web solutions with modern technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center md:items-end"
          >
            <div className="flex gap-4 mb-4">
              <Link
                href="https://github.com/harygbolahan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="mailto:harygbolahan@gmail.com"
                className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">© {currentYear} Mubarak Oyekanmi. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

