# SpeechToLCD
SpeechToLCD includes a Node.js server which makes a websocket connecting with a front-end HTML page as the client. In the front-end page one can record some audio which, after stopping the recording, will be send back to the Node.js server. The Node.js server launches a child process, which is the Python script. This script does the speech recognition for us. The recognized speech then gets send to the LCD connected to the Raspberry Pi.


## How to use it
For the speech recognition code in Python to properly work you have to:
```python
pip install SpeechRecognition
```


## Todo
- [x] Send recognized speech data to LCD in Python script.
- [ ] Add functionality when the supplied text is longer then 32 characters the LCD starts scrolling.
- [ ] Add a nice web UI with React or another front-end tool.
- [ ] Make the Python code nice and readable.
- [ ] Fully update the README.md also with info on FLAC.
- [ ] Add comments to code.
- [ ] Maybe use WebSockets instead of Socket.io.


## Links
Most information and inspiration for this project came from the following links:
- For the microphone input from front-end to back-end: https://medium.com/google-cloud/building-a-client-side-web-app-which-streams-audio-from-a-browser-microphone-to-a-server-part-ii-df20ddb47d4e
- For speech recognition in Python: https://realpython.com/python-speech-recognition/
- For setting up the HD44780 with the Raspberry Pi: https://tutorials-raspberrypi.com/raspberry-pi-lcd-display-16x2-characters-display-hd44780/
