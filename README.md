# WhatsApp Chatbot Integration

This project integrates a WhatsApp chatbot using `whatsapp-web.js` and a Python-based chatbot utilizing the Groq language model and Google Text-to-Speech (gTTS).

## Overview

- **WhatsApp Integration:** Uses `whatsapp-web.js` to interact with WhatsApp Web, display QR codes in the terminal, and handle incoming messages.
- **Chatbot Functionality:** The chatbot generates responses and audio using the Groq model and gTTS.

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3 and pip

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/whatsapp-chatbot.git
    cd whatsapp-chatbot
    ```

2. **Set up the Node.js environment:**

    ```bash
    npm install
    ```

3. **Set up the Python environment:**

    Create a virtual environment and install the required packages:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use: venv\Scripts\activate
    pip install langchain-groq langchain-core gtts
    ```

4. **Configure Python script:**

    Ensure `chatbot.py` is in the same directory as `whatsapp.js`.

5. **Run the WhatsApp bot:**

    ```bash
    node whatsapp.js
    ```

6. **Scan the QR code:**

    - A QR code will be generated and displayed in the terminal.
    - Scan it using your WhatsApp mobile app to connect.

### Usage

- The bot will respond to incoming messages with a text reply and an audio file generated by the Python script.
- Customize `chatbot.py` to adjust the chatbot's behavior and responses.

### Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
