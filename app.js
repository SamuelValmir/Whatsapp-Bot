// import session from "./session/session";
// import {Client, } from "whatsapp-web.js"
// import qrcode from "qrcode-terminal"
// import fs from "fs"
// // session.run();
// const SESSION_FILE_PATH = "./session.json";


// const client = new Client({});

// client.on("qr", qr => {
//     qrcode.generate(qr, { small: true });
// });

// // Storage cookies/credentials
// client.on("authenticated", (session) => { // It runs when a session is started (client.on("ready"))
//     session;
//     console.log(session);
//     console.log(JSON.stringify(session));
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), error => {
//         if (error) console.error(error);
//     });
// });

// client.initialize();


// client.create("session-bot", (base64QR, asciiQR) => {
//     console.log(123);
//     exportQR(base64QR, "bot-qr.png");
// }).then(client => start(client));

// function start(client) {
//     client.onMessage((message) => {
//         if (message.body.toLowerCase() === "Hello") {
//             client.sendText(message.from, "World!");
//         };

//         if (message.body.toLowerCase() === "Cu") {
//             client.sendText(message.from, "Só se for o teu!");
//             client.sendText(message.from, "Seu corno!")
//         };
//     });

//     console.log("process");
//     console.log(process);
//     console.log("process.env");
//     console.log(process.env);
// };

// function exportQR(qrCode, path) {
//     qrCode = qrCode.replace('data:image/png;base64,', "");
//     const imageBuffer = Buffer.from(qrCode, "base64");

//     fs.writeFileSync(path, imageBuffer);
// };


import { createBot } from 'whatsapp-cloud-api';
// or if using require:
// const { createBot } = require('whatsapp-cloud-api');

(async () => {
  try {
    // replace the values below
    const from = 'YOUR_WHATSAPP_PHONE_NUMBER_ID';
    const token = 'YOUR_TEMPORARY_OR_PERMANENT_ACCESS_TOKEN';
    const to = 'PHONE_NUMBER_OF_RECIPIENT';
    const webhookVerifyToken = 'YOUR_WEBHOOK_VERIFICATION_TOKEN';

    // Create a bot that can send messages
    const bot = createBot(from, token);

    // Send text message
    const result = await bot.sendText(to, 'Hello world');

    // Start express server to listen for incoming messages
    // NOTE: See below under `Documentation/Tutorial` to learn how
    // you can verify the webhook URL and make the server publicly available
    await bot.startExpressServer({
      webhookVerifyToken,
    });

    // Listen to ALL incoming messages
    // NOTE: remember to always run: await bot.startExpressServer() first
    bot.on('message', async (msg) => {
      console.log(msg);

      if (msg.type === 'text') {
        await bot.sendText(msg.from, 'Received your text message!');
      } else if (msg.type === 'image') {
        await bot.sendText(msg.from, 'Received your image!');
      }
    });
  } catch (err) {
    console.log(err);
  }
})();