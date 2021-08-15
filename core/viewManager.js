const fs = require("fs");

class ViewManager {
    loadView(fileName) {
        try {
            const data = fs.readFileSync(`${process.env.ROOT}/views/${fileName}.html`, "utf-8");
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ViewManager;
