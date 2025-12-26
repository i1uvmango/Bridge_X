require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

async function testWebex() {
    // Explicitly use the token defined as WEBEX_ACCESS_TOKEN (which should be the User Token now)
    const token = process.env.WEBEX_ACCESS_TOKEN;
    const log = { logs: [], error: null, success: false };

    function logMsg(msg) {
        console.log(msg);
        log.logs.push(msg);
    }

    if (!token) {
        logMsg('Error: WEBEX_ACCESS_TOKEN is missing');
        fs.writeFileSync('result.json', JSON.stringify(log, null, 2));
        return;
    }

    logMsg(`Testing with Token: ${token.substring(0, 15)}...`);

    try {
        logMsg('1. Testing People API (Me)...');
        // This checks WHO the token belongs to
        const meRes = await axios({
            method: 'get',
            url: 'https://webexapis.com/v1/people/me',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        logMsg(`✅ Identity Verified: ${meRes.data.emails[0]} (${meRes.data.type})`);

        if (meRes.data.type === 'bot') {
            logMsg('⚠️ WARNING: This is still recognized as a BOT token. Meetings might fail.');
        } else {
            logMsg('✅ Good: This is a USER token.');
        }

        logMsg('\n2. Testing Meeting Creation...');
        const now = new Date();
        const start = new Date(now.getTime() + 5 * 60000);
        const end = new Date(start.getTime() + 60 * 60000);

        const meetingParams = {
            method: 'post',
            url: 'https://webexapis.com/v1/meetings',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                title: 'Test Meeting (Agent Check)',
                start: start.toISOString(),
                end: end.toISOString(),
                enabledAutoRecordMeeting: false,
                allowAnyUserToBeCoHost: false,
                enabledJoinBeforeHost: true,
                joinBeforeHostMinutes: 5,
                publicMeeting: false,
            }
        };

        const meetingRes = await axios(meetingParams);
        logMsg(`✅ Meeting Created! ID: ${meetingRes.data.id}`);
        logMsg(`WebLink: ${meetingRes.data.webLink}`);
        log.success = true;
        log.meeting = meetingRes.data;

        // Clean up
        await axios.delete(`https://webexapis.com/v1/meetings/${meetingRes.data.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        logMsg('✅ Test meeting deleted.');

    } catch (error) {
        logMsg('❌ Error during Webex test');
        log.error = {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
        };
    } finally {
        fs.writeFileSync('result.json', JSON.stringify(log, null, 2));
    }
}

testWebex();
