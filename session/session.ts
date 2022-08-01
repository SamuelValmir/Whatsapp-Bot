import fs from "fs";
import { Client, LegacySessionAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const SESSION_FILE_PATH = "./session.json";
let client: Client;
let sessionData: any;


function run() {
    fs.existsSync(SESSION_FILE_PATH) ? startSession() : createSession();
};

function startSession() {

    // client.on("ready", () => {
    //     console.log("Client is ready!");
    // });

    // client.on("message", msg => {
    //     if (msg.body.toLowerCase() === "Hello") {
    //         msg.reply("World!");
    //     };
    // });
};

// Generate the qr code
function createSession() {
    client = new Client({});

    client.on("qr", qr => {
        qrcode.generate(qr, { small: true });
    });


    // Storage cookies/credentials
    client.on("authenticated", (session) => { // It runs when a session is started (client.on("ready"))
        sessionData = session;
        console.log(session);
        console.log(JSON.stringify(session));
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), error => {
            if (error) console.error(error);
        });
    });

    client.initialize();
};

// const session = {}
export default { run };

