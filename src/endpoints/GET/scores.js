const fs = require("fs");

module.exports = {
    endpoint: "/scores",
    async method(req, res) {
        const scoreData = JSON.parse(fs.readFileSync("./data/scores.json"));
        res.status(200).send(scoreData["scores"])
    }
}