const ViewManager = require("./viewManager");
const myAnimeList = require("./apis/myAnimeList");
const animechan = require("./apis/animechan");

const getRequest = require("./request");

class Controller {
    callAction() {
        const { params } = getRequest();

        if (Object.keys(params).length === 0) {
            return this.defaultPage();
        } else {
            this.callAPI(params);
        }
    }

    defaultPage() {
        const viewManager = new ViewManager();
        const result = viewManager.loadView("index");

        const url = myAnimeList.generateAuthURL();

        return result + `<a href='${url}' target='_blank'>Authenticate</a>`;
    }

    callAPI(params) {
        const { authCode } = params;

        myAnimeList.authenticate(authCode, (result) => {
            const token = result.access_token;

            myAnimeList.getAnimesList(token, this.getAnimeQuotes);
        });
    }

    getAnimeQuotes(animes) {
        const title = animes.data[1].node.title;
        animechan.getAnimeQuotes(title, (quotes) => {
            console.log(quotes);
        });
    }
}

module.exports = Controller;
