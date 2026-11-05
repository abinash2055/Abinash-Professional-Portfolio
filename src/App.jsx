import React from 'react'

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import AboutMe from "./components/AboutMe"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import AwardsCertificate from "./components/AwardsCertificate"
import Education from "./components/Education"
import Tools from "./components/Tools"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"


const App = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">

      {/* Navigation */}
      <Navbar />

      {/* Main Portfolio Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-5 py-10 sm:px-8 md:gap-32 lg:px-12">

        {/* Hero Section */}
        <section id="home" className="scroll-mt-24">
          <Hero />
        </section>

        {/* About Me */}
        <section id="about" className="scroll-mt-24">
          <AboutMe />
        </section>

        {/* Technical Skills */}
        <section id="skills" className="scroll-mt-24">
          <Skills />
        </section>

        {/* Professional Experience */}
        <section id="experience" className="scroll-mt-24">
          <Experience />
        </section>

        {/* Achieved Awards and Certificate */}
        <section id="awardscertificate" className="scroll-mt-24">
          <AwardsCertificate />
        </section>

        {/* Learned Education */}
        <section id="education" className="scroll-mt-24">
          <Education />
        </section>

        {/* Technical Tools */}
        <section id="tools" className="scroll-mt-24">
          <Tools />
        </section>

        {/* Developed Projects */}
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24">
          <Contact />
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default App