const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: false });
const handle = app.getRequestHandler();
const httpsOptions = {
    key: fs.readFileSync("./cert.key"),
    cert: fs.readFileSync("./cert.crt"),
};
app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(2087, (err) => {
        if (err) throw err;
        console.log("> Server started onnnnn https://localhost:2087");
    });
});