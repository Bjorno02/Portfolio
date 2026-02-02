import './App.css'
import Hero from './components/Hero';
import Navbar from './components/Navbar';
//import Button from './components/ui/Button';
import About from './components/About';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';


function App() {

  return (
    <div className="min-h-screen text-black">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <ContactForm />
      <h1 className="text-2xl font-bold pt-16">Bjorn's Works</h1>

    </div>
  );
}

export default App;
