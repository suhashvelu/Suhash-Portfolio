
const https = require('https');

function checkUser(username) {
    const options = {
        hostname: 'api.github.com',
        path: `/users/${username}/repos?per_page=1`,
        headers: {
            'User-Agent': 'NodeJS-Script'
        }
    };

    https.get(options, (res) => {
        console.log(`User: ${username}, Status: ${res.statusCode}`);
        res.on('data', () => { }); // consume 
    }).on('error', (e) => {
        console.error(e);
    });
}

checkUser('SUHASHVELU');
checkUser('suhashvelusamy');
