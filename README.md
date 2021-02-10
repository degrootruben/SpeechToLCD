# SpeechToLCD

SpeechToLCD includes a Node.js server which makes a websocket connecting with a front-end HTML page as the client. In the front-end page one can record some audio which, after stopping the recording, will be send back to the Node.js server. The Node.js script launches a child process from the Python script which does the speech recognition for us and pipes it back to the Node.js script. The Node.js script sends back the recognized speech to the front-end with the websockect connection. The front-end displays this data on its page.

For the speech recognition code in Python to properly work you have to:
```python
pip install SpeechRecognition
```

Most information and inspiration from this project came from the following links:
https://medium.com/google-cloud/building-a-client-side-web-app-which-streams-audio-from-a-browser-microphone-to-a-server-part-ii-df20ddb47d4e
https://realpython.com/python-speech-recognition/
