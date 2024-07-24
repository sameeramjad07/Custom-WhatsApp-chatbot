
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

// Use LocalAuth for session persistence
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        instance: puppeteer,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
        timeout: 60000
    }
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
    console.log('QR Code generated. Scan it using your WhatsApp.');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    console.log(`Message from ${message.from}: ${message.body}`);

    // Path to the Python interpreter in the virtual environment
    const pythonPath = path.join(__dirname, 'venv', 'Scripts', 'python'); // Windows
    // const pythonPath = path.join(__dirname, 'venv', 'bin', 'python'); // macOS/Linux

    // Call Python script to get chatbot response
    const pythonProcess = spawn(pythonPath, ['chatbot.py', message.body]);

    pythonProcess.stdout.on('data', async (data) => {
        const output = data.toString().trim();
        const [responseText, audioFilePath] = output.split('|');

        // Send text response
        await message.reply(responseText);

        // Send audio response
        if (audioFilePath) {
            const audio = MessageMedia.fromFilePath(audioFilePath);
            await client.sendMessage(message.from, audio);

            // Clean up audio file after sending
            fs.unlink(audioFilePath, (err) => {
                if (err) console.error('Failed to delete audio file:', err);
            });
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Python error:', data.toString());
    });
});

client.on('disconnected', async (reason) => {
    console.log('Client was logged out', reason);
    try {
        await client.initialize(); // Re-initialize the client
    } catch (error) {
        console.error('Error during re-initialization:', error);
    }
});

// Initialize the client with error handling
(async () => {
    try {
        await client.initialize();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
})();
