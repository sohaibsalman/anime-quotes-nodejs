const queryString = require("querystring");

class Request {
    static getInstance() {
        if (!this.instance) {
            this.instance = new Request();
        }
        return this.instance;
    }

    setRequest(request, callback) {
        this.url = request.url;

        let data = "";

        request.on("data", (chunk) => {
            data += chunk;
        });

        request.on("end", () => {
            this.params = queryString.parse(data);
            callback();
        });
    }
}

const getRequest = () => {
    return Request.getInstance();
};

module.exports = getRequest;
