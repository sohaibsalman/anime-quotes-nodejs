const https = require("https");
const queryString = require("querystring");

const credentials = require("../../config/authentication");

const generateAuthURL = () => {
    const { clientId, codeChallenge } = credentials;
    const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${clientId}&code_challenge=${codeChallenge}`;

    return url;
};

const authenticate = (authCode, callback) => {
    let data = {
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
        code: authCode,
        code_verifier: credentials.codeChallenge,
        grant_type: "authorization_code",
    };

    data = queryString.stringify(data);

    let result = "";
    const req = https.request(
        "https://myanimelist.net/v1/oauth2/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        },
        (res) => {
            res.on("data", (chunk) => {
                result += chunk;
            });

            res.on("end", () => {
                callback(JSON.parse(result));
            });
        }
    );

    req.write(data);
    req.end();
};

const getAnimesList = (token, callback) => {
    const url = "https://api.myanimelist.net/v2/anime?q=dragon";

    let result = "";

    const req = https.request(
        url,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        (res) => {
            res.on("data", (chunk) => {
                result += chunk;
            });

            res.on("end", () => {
                callback(JSON.parse(result));
            });
        }
    );

    req.end();
};

module.exports = {
    generateAuthURL,
    authenticate,
    getAnimesList,
};
