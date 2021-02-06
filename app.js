const express = require("express");
const multer = require("multer");
const fs = require("fs");
const https = require("https");

const app = express();
const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");
const server = https.createServer({key: key, cert: cert}, app);

const upload = multer();

app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.listen(8000, () => {
    console.log("Listening on port 8000!");
});

app.get("/", (req, res) => {
    res.status(200).sendFile("./index.html");
});

app.post("/upload_audio", upload.single("audioBlob"), (req, res, next) => {
    let uploadLocation = __dirname + "\\public\\uploads\\" + req.file.originalname;
    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
    res.sendStatus(200);
});

app.use((req, res) => {
    res.status(404).send("Error 404 not found");
});

process.on("SIGINT", _ => process.exit());
