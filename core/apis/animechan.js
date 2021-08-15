const https = require("https");

const getAnimeQuotes = (title, callback) => {
    console.log(title);
    const url = `https://animechan.vercel.app/api/quotes/anime?title=${title}`;

    let result = "";

    const req = https.request(
        url,
        {
            method: "GET",
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
    getAnimeQuotes,
};
