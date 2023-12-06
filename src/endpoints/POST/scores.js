const fs = require("fs");

module.exports = {
    endpoint: "/scores",
    async method(req, res) { /* Function still needs to check if score already exists, this may come later with a MongoDB solution */
        const { name, score } = req.body;

        // Check if request has both fields
        if (!name || !score)
            return res.status(400).send("Request missing name and/or score fields.");

        // Check if field types are correct
        if (typeof(name) !== 'string' || typeof(score) !== 'number')
            return res.status(400).send("'score' and/or 'name' field types are incorrect.")
        
        const scoreData = JSON.parse(fs.readFileSync("./data/scores.json"));
        
        scoreData["scores"].push({ "name": name, "score": score });
        fs.writeFileSync("./data/scores.json", JSON.stringify(scoreData, null, 4));

        res.status(200).send("Uploaded data successfully");
    }
}