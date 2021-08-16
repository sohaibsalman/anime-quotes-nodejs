const ViewManager = require("./viewManager");
const myAnimeList = require("./apis/myAnimeList");
const animechan = require("./apis/animechan");

const getRequest = require("./request");

class Controller {
    callAction(callback) {
        const { params } = getRequest();

        if (Object.keys(params).length === 0) {
            return this.defaultPage(callback);
        } else {
            try {
                this.callAPI(params, callback);
            } catch (error) {
                this.showError(callback);
            }
        }
    }

    defaultPage(callback) {
        const viewManager = new ViewManager();
        let result = viewManager.loadView("index");

        const url = myAnimeList.generateAuthURL();

        result += `<a href='${url}' target='_blank'>Authenticate</a>`;

        callback(result);
    }

    callAPI(params, callback) {
        const { authCode, animeName } = params;

        myAnimeList.authenticate(authCode, (result) => {
            const token = result.access_token;

            myAnimeList.getAnimesList(token, (animes) => {
                try {
                    animechan.getAnimeQuotes(animeName, (quotes) => {
                        quotes = JSON.parse(quotes);

                        let result = "";

                        if (quotes.error) {
                            result = `<h2> ${quotes.error} for ${animeName} </h2>`;
                        } else {
                            result = `<h2>Quotes from ${animeName}</h2>`;

                            result += "<ul>";

                            quotes.forEach((element) => {
                                result += `<li> <strong> ${element.character}: </strong> ${element.quote} </li>`;
                            });

                            result += "</ul>";
                        }

                        callback(result);
                    });
                } catch (error) {
                    this.showError(callback);
                }
            });
        });
    }

    showError(callback) {
        const viewManager = new ViewManager();
        let result = viewManager.loadView("error");

        callback(result);
    }
}

module.exports = Controller;
