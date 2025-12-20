
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTest() {
    console.log('--- Starting Verification ---');

    // 1. Submit First Contact
    const user1 = { name: 'Test User', email: 'test@example.com', message: 'Hello World' };
    console.log(`\n[1] Submitting contact form for ${user1.email}...`);

    let res = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user1)
    });

    if (!res.ok) {
        console.error('Failed to submit form:', await res.text());
        return;
    }

    let data = await res.json();
    console.log('Success!', data);
    const token1 = data.token;

    if (!token1) {
        console.error('CRITICAL: No token received!');
        process.exit(1);
    }

    // 2. Submit AGAIN (Test Token Reuse)
    console.log(`\n[2] Submitting AGAIN for ${user1.email} (Testing Token Reuse)...`);
    const user1_update = { name: 'Test User Updated', email: 'test@example.com', message: 'Updated Message' };

    res = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user1_update)
    });

    data = await res.json();
    console.log('Success (Update)!', data);
    const token2 = data.token;

    if (token1 === token2) {
        console.log('PASS: Token remained consistent for the same user.');
    } else {
        console.error('FAIL: Token changed! Expected reuse.');
        console.log('Token 1:', token1);
        console.log('Token 2:', token2);
    }

    // 3. Test Protected Route (GET messages)
    console.log(`\n[3] Fetching messages using JWT...`);
    res = await fetch(`${BASE_URL}/messages`, {
        headers: { 'Authorization': `Bearer ${token1}` }
    });

    if (!res.ok) {
        console.error('Failed to fetch messages:', await res.text());
    } else {
        const profile = await res.json();
        console.log('Fetched Profile:', profile);

        if (profile.message === 'Updated Message') {
            console.log('PASS: Data was correctly updated and retrieved.');
        } else {
            console.error('FAIL: Data mismatch.');
        }
    }

    // 4. Test Invalid Token
    console.log(`\n[4] Testing Invalid Token...`);
    res = await fetch(`${BASE_URL}/messages`, {
        headers: { 'Authorization': `Bearer invalid_token` }
    });

    if (res.status === 403) {
        console.log('PASS: Invalid token rejected (403).');
    } else {
        console.error(`FAIL: Expected 403, got ${res.status}`);
    }

    console.log('\n--- Verification Complete ---');
}

// Wait for server to potentially start
(async () => {
    try {
        await runTest();
    } catch (e) {
        console.error('Test script error (is server running?):', e.message);
    }
})();
