# SpeechToLCD

SpeechToLCD includes a Node.js server which makes a websocket connecting with a front-end HTML page as the client. In the front-end page one can record some audio which, after stopping the recording, will be send back to the Node.js server. The Node.js server launches a child process, which is the Python script. This script does the speech recognition for us. The recognized speech then gets send to the LCD connected to the Raspberry Pi.

Todo:
- Send recognized speech data to LCD in Python script.

For the speech recognition code in Python to properly work you have to:
```python
pip install SpeechRecognition
```

Most information and inspiration for this project came from the following links:
- https://medium.com/google-cloud/building-a-client-side-web-app-which-streams-audio-from-a-browser-microphone-to-a-server-part-ii-df20ddb47d4e
- https://realpython.com/python-speech-recognition/
