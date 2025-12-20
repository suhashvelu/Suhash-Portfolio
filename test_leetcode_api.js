
const username = 'SUHASH_03';
const url1 = `https://leetcode-stats-api.herokuapp.com/${username}`;
// Backup API if the first is slow/broken
const url2 = `https://alfa-leetcode-api.onrender.com/${username}/calendar`;

async function checkApi() {
    console.log(`Fetching from ${url1}...`);
    try {
        const res = await fetch(url1);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        console.log('API 1 submissionCalendar keys:', data.submissionCalendar ? Object.keys(data.submissionCalendar).length : 'MISSING');
        if (data.submissionCalendar) {
            console.log('Sample data:', JSON.stringify(data.submissionCalendar).slice(0, 100));
        }
    } catch (e) {
        console.error('API 1 failed:', e.message);
    }

    console.log(`Fetching from ${url2}...`);
    try {
        const res = await fetch(url2);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        // Alfa API structure might differ, often it returns 'submissionCalendar' string or object
        console.log('API 2 keys:', Object.keys(data));
        console.log('API 2 Data:', JSON.stringify(data).slice(0, 200));
    } catch (e) {
        console.error('API 2 failed:', e.message);
    }
}

checkApi();
