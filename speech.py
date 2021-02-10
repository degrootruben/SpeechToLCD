import speech_recognition as sr
import os
dirname = os.path.dirname(__file__)

r = sr.Recognizer()
audioFile = sr.AudioFile(os.path.join(dirname, "public\\upload.wav"))
with audioFile as source:
    audio = r.record(source)

print(r.recognize_google(audio, language="nl-NL"))
