const Router = require("./router");

class App {
    run(callback) {
        const router = new Router();
        router.routeRequest((result) => {
            callback(result);
        });
    }
}

module.exports = App;
