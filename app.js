const express = require("express");
const formidable = require("formidable");
const LCD = require("lcd");
const lcd = new LCD({rs: 7, e: 11, data: [10, 15, 16, 18], cols: 16, rows: 2});

const app = express();

app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

lcd.on('ready',async _ => {
    lcd.setCursor(0, 0);
    lcd.autoscroll();
    lcd.print("Hello world!", err => {
    	if (err) {
    		throw err;
    	}
	lcd.close();
    });
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log("Waiting is over!");
    lcd.clear()
    lcd.setCursor(0,0);
    lcd.blink();
});

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

process.on('SIGINT', _ => {
    lcd.close();
    process.exit();
});
