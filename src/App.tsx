import './App.css'
import Hero from './components/Hero';
import Navbar from './components/Navbar';
//import Button from './components/ui/Button';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/ContactForm';
import FloatingClouds from './components/FloatingClouds';


function App() {

  return (
    <div className="min-h-screen text-black">
      <Navbar />
      <Hero />
      <div className="relative bg-gradient-to-b from-[#ECDFD2] to-[#8FAE7E] border-b-16 border-[#4A5E3A]">
        <FloatingClouds />
        <About />
        <Skills />
        <Projects />
      </div>
      <Experience />
      <div className="h-3 bg-gradient-to-r from-[#3B2A1A] via-[#C7984F] to-[#3B2A1A]" />
      <Contact />
    </div>
  );
}

export default App;
