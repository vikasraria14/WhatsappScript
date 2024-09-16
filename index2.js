const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Function to send message with optional attachment
const sendMessage = async (contacts, message, attachmentPath = null) => {
    // Initialize WhatsApp client
    const client = new Client({
        authStrategy: new LocalAuth()
    });

    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
        console.log('Scan the QR code above to log in to WhatsApp.');
    });

    client.on('ready', async () => {
        console.log('Client is ready!');

        for (const contact of contacts) {
            const chatId = `${contact}@c.us`;
            try {
                await client.sendMessage(chatId, message);
                console.log(`Message sent to ${contact}`);
                
                if (attachmentPath) {
                    const media = MessageMedia.fromFilePath(attachmentPath);
                    await client.sendMessage(chatId, media);
                    console.log(`Attachment sent to ${contact}`);
                }
            } catch (err) {
                console.error(`Failed to send message to ${contact}: ${err}`);
            }
        }

        // End the session
        client.destroy();
    });

    client.initialize();
};

// Example usage
sendMessage(
    ["+919501681423"], 
    "Hi there!"
    // "path/to/your/attachment.jpg"  // Optional: Remove this argument if you don't want to send an attachment
);
