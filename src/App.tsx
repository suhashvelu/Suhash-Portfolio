import Lenis from 'lenis';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Profiles from './components/Profiles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import SocialStrip from './components/SocialStrip';
import Resume from './components/Resume';

const GITHUB_USERNAME = 'SUHASHVELU';
const LEETCODE_USERNAME = 'SUHASH_03';

function App() {
    const [loading, setLoading] = useState(true);
    const [githubData, setGithubData] = useState<any>(null);
    const [leetcodeStats, setLeetcodeStats] = useState(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor links
        function handleAnchorClick(e: MouseEvent) {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const id = anchor.getAttribute('href')?.substring(1);
                if (id) {
                    const element = document.getElementById(id);
                    if (element) {
                        lenis.scrollTo(element);
                    }
                }
            }
        }

        document.addEventListener('click', handleAnchorClick);

        // Initial Data Loading
        const loadData = async () => {
            try {
                // Preload critical images
                const imageUrls = [
                    '/Logo/s3v.png',
                    '/Logo/s3v.svg',
                    // Add other critical large images if any
                ];

                const imagePromises = imageUrls.map(url => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = url;
                        img.onload = () => resolve(true);
                        img.onerror = () => resolve(true); // Continue even if image fails
                    });
                });

                // Fetch GitHub Data
                const githubPromise = Promise.all([
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`).then(r => r.json()),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then(r => r.json())
                ]).then(([repos, user]) => {
                    const topRepos = repos
                        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
                        .slice(0, 6);

                    setGithubData({ repos: topRepos, stats: user });
                });

                // Fetch LeetCode Data
                const leetcodePromise = fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`)
                    .then(r => r.json())
                    .then(data => {
                        setLeetcodeStats({
                            totalSolved: data.totalSolved || 0,
                            ranking: data.ranking || 'N/A'
                        } as any);
                    });

                // Wait for minimum time (animation) + data fetching
                // We race against a minimum timeout to ensure the logo animation is seen at least briefly
                await Promise.all([
                    ...imagePromises,
                    githubPromise,
                    leetcodePromise,
                    new Promise(resolve => setTimeout(resolve, 2000)) // Min 2s loading
                ]);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();

        return () => {
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-white text-black min-h-screen w-[92%] max-w-[1600px] mx-auto relative animate-fadeIn">
            <Navbar />
            <Hero />
            <Resume />
            <TechStack />
            <Projects />
            <Profiles githubData={githubData} leetcodeStats={leetcodeStats} />
            <Contact />
            <SocialStrip />
            <Footer />
        </div>
    );
}

export default App;

