const getRequest = require("./request");
const Controller = require("./controller");

class Router {
    routeRequest() {
        const request = getRequest();

        if (request.url === "/") {
            const controller = new Controller();
            const result = controller.callAction();

            return result;
        }
    }
}

module.exports = Router;
