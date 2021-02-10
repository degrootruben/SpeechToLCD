const express = require("express");
const fs = require("fs");
const https = require("https");
const { spawn } = require("child_process");

const app = express();
const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");
const server = https.createServer({ key, cert }, app);
const io = require("socket.io")(server, { cors: { origin: "http://localhost:8000" }});

// Middleware
app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.status(200).sendFile("./index.html");
});

app.use((req, res) => {
    res.status(404).send("Error 404 not found");
});

// Socket code
io.on("connect", client => {
    client.on("message", async data => {
        const dataURL = data.audio.dataURL.split(",").pop();
        let fileBuffer = Buffer.from(dataURL, "base64");
        fs.writeFileSync("./public/upload.wav", fileBuffer);
        const python = spawn("python3", ["speech.py"]);
        python.stdout.on("data", data => {
            io.emit("result", data.toString());
        });
        python.on("exit", function() {
            python.kill();
            console.log("Python script ended");
        });
    });
});

server.listen(8000, () => {
    console.log("Listening on port 8000!");
});

process.on("SIGINT", _ => process.exit());
