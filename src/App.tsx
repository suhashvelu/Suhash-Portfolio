import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Profiles from './components/Profiles';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <div className="bg-white text-black">
            <Navbar />
            <Hero />
            <TechStack />
            <Projects />
            <Profiles />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;

