import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import { Header } from "@/components/header"

export const metadata = {
  title: "Mubarak Oyekanmi | Creative Full Stack Developer",
  description:
    "Portfolio of Mubarak Oyekanmi, a Full Stack Developer from Nigeria specializing in creating innovative digital experiences",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
    </main>
  )
}

