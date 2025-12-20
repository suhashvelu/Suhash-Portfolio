import { useState, useEffect } from 'react';
import { FaGithub, FaStar } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import profilesData from '../data/profiles.json';

const GITHUB_USERNAME = 'SUHASHVELU';
const LEETCODE_USERNAME = 'SUHASH_03';

const Profiles = ({ githubData: propGithubData, leetcodeStats: propLeetcodeStats }) => {
    const [localGithubData, setLocalGithubData] = useState({ repos: [], stats: null });
    const [localLeetcodeStats, setLocalLeetcodeStats] = useState(null);
    const [loading, setLoading] = useState({ github: true, leetcode: true });

    // Use props if available, otherwise local state
    const githubData = propGithubData || localGithubData;
    const leetcodeStats = propLeetcodeStats || localLeetcodeStats;
    const isLoading = {
        github: propGithubData ? false : loading.github,
        leetcode: propLeetcodeStats ? false : loading.leetcode
    };

    useEffect(() => {
        // Only fetch if props are NOT provided
        if (!propGithubData) {
            Promise.all([
                fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`).then(r => r.json()),
                fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then(r => r.json())
            ])
                .then(([repos, user]) => {
                    const topRepos = repos
                        .sort((a, b) => b.stargazers_count - a.stargazers_count)
                        .slice(0, 6);
                    setLocalGithubData({ repos: topRepos, stats: user });
                    setLoading(p => ({ ...p, github: false }));
                })
                .catch(() => setLoading(p => ({ ...p, github: false })));
        }

        if (!propLeetcodeStats) {
            fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`)
                .then(r => r.json())
                .then(data => {
                    setLocalLeetcodeStats({
                        totalSolved: data.totalSolved || 0,
                        ranking: data.ranking || 'N/A'
                    });
                    setLoading(p => ({ ...p, leetcode: false }));
                })
                .catch(() => setLoading(p => ({ ...p, leetcode: false })));
        }
    }, [propGithubData, propLeetcodeStats]);

    return (
        <section
            id="profiles"
            className="w-full py-20 px-6 bg-white text-black border-t-[3px] border-black flex justify-center"
        >
            <div className="max-w-7xl w-full">
                <h2
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                    style={{ fontFamily: "'Melodrama', serif" }}
                >
                    {profilesData.title.toUpperCase()}
                </h2>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* ================= GitHub ================= */}
                    <div className="border-[3px] border-black bg-white">
                        <div className="border-b-[3px] border-black p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <FaGithub className="text-4xl" />
                                    <div>
                                        <h3 className="text-2xl font-bold" style={{ fontFamily: "'Melodrama', serif" }}>
                                            GitHub
                                        </h3>
                                        <p className="text-xs uppercase tracking-wider opacity-60 mt-0.5">
                                            Contributions & Repositories
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={`https://github.com/${GITHUB_USERNAME}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 border-black px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition"
                                >
                                    View All →
                                </a>
                            </div>

                            {!isLoading.github && githubData.stats && (
                                <div className="grid grid-cols-3 gap-3 mt-3">
                                    {[
                                        ['Repos', githubData.stats.public_repos],
                                        ['Followers', githubData.stats.followers],
                                        ['Following', githubData.stats.following]
                                    ].map(([label, value]) => (
                                        <div key={label} className="border-2 border-black p-3 text-center">
                                            <p className="text-2xl font-bold">{value}</p>
                                            <p className="text-xs opacity-60">{label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="border-2 border-black mt-3 p-3 bg-gray-50">
                                <img
                                    src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                                    alt="GitHub Contributions"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="p-4">
                            <h4 className="text-sm uppercase tracking-wider opacity-60 mb-3">
                                Top Repositories
                            </h4>

                            <div className="grid grid-cols-3 gap-3">
                                {githubData.repos.map(repo => (
                                    <a
                                        key={repo.id}
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border-2 border-black p-3 hover:shadow-md transition"
                                    >
                                        <h5 className="font-bold text-sm mb-1">{repo.name}</h5>
                                        <div className="flex items-center gap-1 text-xs opacity-70">
                                            <FaStar className="text-yellow-500" />
                                            <span>{repo.stargazers_count}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ================= LeetCode ================= */}
                    <div className="border-[3px] border-black bg-white">
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <SiLeetcode className="text-4xl" />
                                    <div>
                                        <h3 className="text-2xl font-bold" style={{ fontFamily: "'Melodrama', serif" }}>
                                            LeetCode
                                        </h3>
                                        <p className="text-xs uppercase tracking-wider opacity-60 mt-0.5">
                                            Problem Solving Stats
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 border-black px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition"
                                >
                                    View Profile →
                                </a>
                            </div>

                            {!isLoading.leetcode && leetcodeStats && (
                                <>
                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        <div className="border-2 border-black p-3 text-center">
                                            <p className="text-3xl font-bold">{leetcodeStats.totalSolved}</p>
                                            <p className="text-xs opacity-60 uppercase">Total Solved</p>
                                        </div>

                                        {leetcodeStats.ranking !== 'N/A' && (
                                            <div className="border-2 border-black p-3 text-center">
                                                <p className="text-3xl font-bold">
                                                    {leetcodeStats.ranking.toLocaleString()}
                                                </p>
                                                <p className="text-xs opacity-60 uppercase">Global Rank</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-2 border-black mt-3 p-3 bg-gray-50">
                                        <img
                                            src={`https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=light&ext=heatmap`}
                                            alt="LeetCode Heatmap"
                                            className="w-full"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profiles;
