import './App.css'
import Hero from './components/Hero';
import Navbar from './components/Navbar';
//import Button from './components/ui/Button';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import ContactForm from './components/ContactForm';
import FloatingClouds from './components/FloatingClouds';


function App() {

  return (
    <div className="min-h-screen text-black">
      <Navbar />
      <Hero />
      <div className="relative bg-gradient-to-b from-[#ECDFD2] to-[#8FAE7E]">
        <FloatingClouds />
        <About />
        <Skills />
        <Projects />
      </div>
      <Experience />
      <ContactForm />
      <h1 className="text-2xl font-bold pt-16">Bjorn's Works</h1>

    </div>
  );
}

export default App;
