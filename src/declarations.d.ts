declare module '*.jsx' {
    const value: any;
    export default value;
}

declare module './components/Navbar' {
    const Navbar: React.FC;
    export default Navbar;
}

declare module './components/Hero' {
    const Hero: React.FC;
    export default Hero;
}

declare module './components/TechStack' {
    const TechStack: React.FC;
    export default TechStack;
}

declare module './components/Projects' {
    const Projects: React.FC;
    export default Projects;
}

declare module './components/Profiles' {
    const Profiles: React.FC<any>; // Accepting any props for now due to recent changes
    export default Profiles;
}

declare module './components/Contact' {
    const Contact: React.FC;
    export default Contact;
}

declare module './components/Footer' {
    const Footer: React.FC;
    export default Footer;
}

declare module './components/Loader' {
    const Loader: React.FC;
    export default Loader;
}

declare module './components/SocialStrip' {
    const SocialStrip: React.FC;
    export default SocialStrip;
}

declare module './components/Resume' {
    const Resume: React.FC;
    export default Resume;
}
