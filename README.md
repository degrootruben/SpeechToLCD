# SpeechToLCD
SpeechToLCD includes a Node.js server which makes a websocket connecting with an HTML page as the client. In the front-end page one can record some audio which, after stopping the recording, will be send back to the Node.js server. The Node.js server launches a child process, which is the Python script. This script preforms the speech recognition. The recognized speech then gets send to the LCD connected to the Raspberry Pi.


## How to use it
1. Connect an HD44780 LCD to your Raspberry Pi according to this schematic:
<img src="https://tutorials-raspberrypi.de/wp-content/uploads/2014/08/lcd_Steckplatine.png" width=50% height=50%>

2. Download the contents of this repo on your Raspberry Pi:
```
git clone https://github.com/degrootruben/SpeechToLCD.git && cd SpeechToLCD/
```

3. Install the necessary npm dependencies:
```
npm install
```

3. Install SpeechRecogniton for Python on your Raspberry Pi:
```python
pip install SpeechRecognition
```

4. It is possible you need to install FLAC on your Raspberry Pi:
```
sudo apt-get install flac
```

5. Launch the Node.js server on your Raspberry Pi:
```javascript
node app
```

6. Navigate to https://localhost:8000 in your browser.


## Links
Most information and inspiration for this project came from the following links:
- For the microphone input from front-end to back-end: https://medium.com/google-cloud/building-a-client-side-web-app-which-streams-audio-from-a-browser-microphone-to-a-server-part-ii-df20ddb47d4e
- For speech recognition in Python: https://realpython.com/python-speech-recognition/
- For setting up the HD44780 with the Raspberry Pi: https://tutorials-raspberrypi.com/raspberry-pi-lcd-display-16x2-characters-display-hd44780/
