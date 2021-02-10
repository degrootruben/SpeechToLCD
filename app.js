const express = require("express");
const fs = require("fs");
const https = require("https");
const {spawn} = require('child_process');

const app = express();
const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");
const server = https.createServer({ key: key, cert: cert }, app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8000",
    },
});

app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.listen(8000, () => {
    console.log("Listening on port 8000!");
});

app.get("/", (req, res) => {
    res.status(200).sendFile("./index.html");
});

app.use((req, res) => {
    res.status(404).send("Error 404 not found");
});

io.on('connect', client => {
    client.on('message', async data => {
        const dataURL = data.audio.dataURL.split(',').pop();
        let fileBuffer = Buffer.from(dataURL, 'base64');
        fs.writeFileSync("./public/upload.wav", fileBuffer);
        const python = spawn('python', ['main.py']);
        python.stdout.on('data', data => { 
            io.emit("result", data.toString())
        });
    });
});

process.on("SIGINT", _ => process.exit());
