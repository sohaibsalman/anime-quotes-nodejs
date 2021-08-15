const credentials = require("../../config/authentication");

const generateAuthURL = () => {
    const { clientId, codeChallenge } = credentials;
    const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${clientId}&code_challenge=${codeChallenge}`;

    return url;
};

module.exports = {
    generateAuthURL,
};
