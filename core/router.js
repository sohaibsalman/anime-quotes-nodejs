const ViewManager = require("./viewManager");
const getRequest = require("./request");
const myAnimeList = require("./apis/myAnimeList");

class Router {
    routeRequest() {
        const request = getRequest();
        let fileName = "";
        let url = "";

        if (request.url === "/") {
            fileName = "index";
            url = myAnimeList.generateAuthURL();

            const viewManager = new ViewManager();
            const result = viewManager.loadView(fileName);

            return result + `<a href='${url}' target='_blank'>Authenticate</a>`;
        }
    }
}

module.exports = Router;
