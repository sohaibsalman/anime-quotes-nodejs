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
            this.callAPI(params, callback);
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
        const { authCode } = params;

        myAnimeList.authenticate(authCode, (result) => {
            const token = result.access_token;

            myAnimeList.getAnimesList(token, (animes) => {
                const title = animes.data[1].node.title;
                animechan.getAnimeQuotes(title, (quotes) => {
                    callback(quotes);
                });
            });
        });
    }
}

module.exports = Controller;
