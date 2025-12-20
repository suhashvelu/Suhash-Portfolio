import { useState, useEffect } from 'react';

const LeetCodeHeatmap = ({ username }) => {
    const [calendar, setCalendar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try the primary API first
                // Using a proxy or direct API that supports CORS is often needed. 
                // alfa-leetcode-api is a popular open source instance.
                const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                // The API usually returns submissionCalendar as a stringified JSON
                const parsedCalendar = typeof data.submissionCalendar === 'string'
                    ? JSON.parse(data.submissionCalendar)
                    : data.submissionCalendar;

                setCalendar(parsedCalendar);
                setLoading(false);
            } catch (err) {
                console.error("LeetCode Heatmap Error:", err);
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (error || loading) {
        // Fallback or Loading state: preserve the original image look or show a minimal loader
        // For now, if error, we show the static image fallback provided in the original Profiles.jsx
        // If loading, we could show a skeleton, but to avoid flicker let's just show nothing or a specific loader.
        // The parent component handles the "loading" state for the whole section, but here we are async.
        // Let's fallback to the image on error, and show a small loader text or similar while loading.
        if (loading) return <div className="h-32 bg-gray-50 flex items-center justify-center text-xs opacity-50">Loading Heatmap...</div>;

        return (
            <img
                src={`https://leetcard.jacoblin.cool/${username}?theme=light&ext=heatmap`}
                alt="LeetCode Heatmap"
                className="w-full"
            />
        );
    }

    // Process data for the heatmap
    // We want the last year (52 weeks)
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Normalize dates to midnight to avoid timezone issues causing offsets
    today.setHours(0, 0, 0, 0);
    oneYearAgo.setHours(0, 0, 0, 0);

    // Generate all days in the range
    const dates = [];
    let currentDate = new Date(oneYearAgo);

    // Align to the previous Sunday to ensure the grid starts correctly (7 rows)
    const dayOfWeek = currentDate.getDay(); // 0 is Sunday
    currentDate.setDate(currentDate.getDate() - dayOfWeek);

    while (currentDate <= today) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Prepare Grid Data
    // We need 7 rows (Sun-Sat) and N columns
    const weeks = [];
    let currentWeek = [];

    dates.forEach(date => {
        // Timestamp for lookup (seconds)
        // Note: LeetCode timestamps are usually in seconds
        // But we need to check if the exact day boundaries match.
        // The API keys are seconds. We need to check if ANY timestamp in the calendar falls on this day.
        // Actually, the API keys are the timestamp of the submission.
        // So we sum up counts for that day.

        // Simpler approach: Check if entry exists for this specific day (UTC vs Local might be tricky).
        // Standard practice: convert API timestamps to Date, check if string representation matches.

        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
        let count = 0;

        // Inefficient but simple loop for the map (calendar is usually small ~365 entries max)
        // Optimization: Convert calendar keys to 'YYYY-MM-DD' map once.
        // Doing strictly inside render for now as it is cheap enough.
    });

    // RE-OPTIMIZATION: Create a map of "YYYY-MM-DD" -> count
    const countMap = {};
    if (calendar) {
        Object.keys(calendar).forEach(ts => {
            const date = new Date(parseInt(ts) * 1000); // ts is in seconds
            const dateKey = date.toISOString().split('T')[0];
            countMap[dateKey] = (countMap[dateKey] || 0) + calendar[ts];
        });
    }

    // Now build grid
    dates.forEach(date => {
        const dateKey = date.toISOString().split('T')[0];
        const count = countMap[dateKey] || 0;

        // Intensity levels (similar to GitHub)
        let level = 0;
        if (count > 0) level = 1;
        if (count > 2) level = 2;
        if (count > 5) level = 3;
        if (count > 10) level = 4;

        currentWeek.push({ date, count, level });

        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    // Handle last partial week if any (though we aligned to weeks start)
    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    // Generate Month Labels
    const monthLabels = [];
    weeks.forEach((week, index) => {
        const firstDay = week[0].date;
        // If it's the first week or the month changed from the previous week's first day
        if (index === 0 || week[0].date.getMonth() !== weeks[index - 1][0].date.getMonth()) {
            monthLabels.push({
                month: firstDay.toLocaleString('default', { month: 'short' }),
                index: index // Column index
            });
        }
    });

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[700px]"> {/* Ensure generic scroll if too small */}
                {/* Months */}
                <div className="flex mb-2 text-xs opacity-60 relative h-4">
                    {monthLabels.map((label, idx) => (
                        // Using style left might be tricky with flex. 
                        // Better to just space them out or use absolute relative to container
                        // Simplest for Grid: render them in a separate row aligned with columns?
                        // Let's use absolute positioning based on column width (approx)
                        <div
                            key={idx}
                            style={{
                                position: 'absolute',
                                left: `${label.index * 13}px` // 10px box + 3px gap approx
                            }}
                        >
                            {label.month}
                        </div>
                    ))}
                </div>

                {/* Heatmap Grid */}
                <div className="flex gap-[3px]">
                    {weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3px]">
                            {week.map((day, dIdx) => {
                                // Determines color
                                const colors = [
                                    'bg-gray-100', // level 0
                                    'bg-green-200',
                                    'bg-green-400',
                                    'bg-green-600',
                                    'bg-green-800'
                                ];

                                return (
                                    <div
                                        key={dIdx}
                                        title={`${day.count} submissions on ${day.date.toDateString()}`}
                                        className={`w-[10px] h-[10px] rounded-[2px] ${colors[day.level]}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Legend (Optional, but nice) */}
                <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
                    <span>Less</span>
                    <div className="w-[10px] h-[10px] bg-gray-100 rounded-[2px]" />
                    <div className="w-[10px] h-[10px] bg-green-200 rounded-[2px]" />
                    <div className="w-[10px] h-[10px] bg-green-400 rounded-[2px]" />
                    <div className="w-[10px] h-[10px] bg-green-600 rounded-[2px]" />
                    <div className="w-[10px] h-[10px] bg-green-800 rounded-[2px]" />
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};

export default LeetCodeHeatmap;
