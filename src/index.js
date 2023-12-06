const express = require("express");
const fs = require("fs");

const directories = [ "GET", "POST" ];

function main()
{
    const app = express();
    app.use(express.json());

    for (const directory of directories)
    {
        const files = fs.readdirSync(`./src/endpoints/${directory}`).filter(file => file.endsWith(".js"));
        console.log(files);

        for (const fileName of files)
        {
            const file = require(`./endpoints/${directory}/${fileName}`);
            if (directory == "GET")
                app.get(file.endpoint, (req, res) => file.method(req, res));
            else if (directory === "POST")
                app.post(file.endpoint, (req, res) => file.method(req, res));
        }

        
    }
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}
main();