const http = require("http");

const App = require("./core/app");
const getRequest = require("./core/request");

process.env.ROOT = __dirname;

const server = http.createServer((req, res) => {
    const request = getRequest();
    request.setRequest(req, () => {
        const app = new App();
        const result = app.run();

        res.end(result);
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
