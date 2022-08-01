import session from "./session/session";
import {Client, } from "whatsapp-web.js"
import qrcode from "qrcode-terminal"
import fs from "fs"
// session.run();
const SESSION_FILE_PATH = "./session.json";


const client = new Client({});

client.on("qr", qr => {
    qrcode.generate(qr, { small: true });
});

// Storage cookies/credentials
client.on("authenticated", (session) => { // It runs when a session is started (client.on("ready"))
    session;
    console.log(session);
    console.log(JSON.stringify(session));
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), error => {
        if (error) console.error(error);
    });
});

client.initialize();


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