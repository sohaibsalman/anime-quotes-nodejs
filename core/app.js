const Router = require("./router");

class App {
    run() {
        const router = new Router();
        const result = router.routeRequest();

        return result;
    }
}

module.exports = App;
