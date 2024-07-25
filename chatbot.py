# chatbot.py
import sys
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from gtts import gTTS

model = ChatGroq(model="llama3-8b-8192", api_key='')

template = ChatPromptTemplate.from_messages([("system", "Your name is BaatGPT. Use that to refer to yourself."), ("user", "{text}")])

chain = template | model

def get_response_and_audio(user_input):
    # Generate text response
    output = chain.invoke({"text": user_input}).content

    # Generate audio response
    tts = gTTS(output, lang='en')
    audio_path = "output.mp3"
    tts.save(audio_path)

    return output, audio_path

if __name__ == "__main__":
    user_input = sys.argv[1]
    response, audio_path = get_response_and_audio(user_input)
    print(f"{response}|{audio_path}")
