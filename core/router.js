const getRequest = require("./request");
const Controller = require("./controller");

class Router {
    routeRequest(callback) {
        const request = getRequest();

        if (request.url === "/") {
            const controller = new Controller();
            controller.callAction((result) => {
                callback(result);
            });
        }
    }
}

module.exports = Router;
