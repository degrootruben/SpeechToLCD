const express = require("express");
const formidable = require("formidable");

const app = express();

app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(8000, () => {
    console.log("Listening on port 8000!");
});

app.get("/", (req, res) => {
    res.status(200).sendFile("./index.html");
});

app.post("/upload_audio", (req, res) => {
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
          console.error('Error', err);
          throw err;
        }
        console.log('Fields', fields);
        console.log('Files', files);
        for (const file of Object.entries(files)) {
          console.log(file);
        }
    });
});

app.use((req, res) => {
    res.status(404).send("Error 404 not found");
});