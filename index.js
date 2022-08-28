/*
    This is a simple bot for discord to take the lastest images uploaded
    and use that image for your windows background image
*/

import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import changeImage from './saveWallpaper.js';

// This variable save the last message in the channel
let lastMessage = null;

// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ] 
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Your bot is ready to capture images!');
});

// ACTIONS
client.on('messageCreate', async (msg) => {
    try {
        console.log('actual author id => ',msg.author.id);
        if(msg.channelId != process.env.DETECT_THIS_CHANNEL) return;
        if(msg.author.id != process.env.ONLY_FROM_USER_ID) return;
        console.log('new message id => ',msg.id);
        lastMessage = msg;
        
    } catch (error) {
        console.log('something wrong ...');
        if(error.message == "Cannot read properties of undefined (reading 'image')") {
            console.log('problema con la imagen');
        }
        console.log('-------');
        console.log('the script still waiting for the next image ...');
    }

});

// This function is used for change the image
const runAgain = async () => {
    try {
        if(lastMessage == null) return console.log('sin imagen a cambiar ...');
        changeImage(lastMessage.embeds[0].image.url);
    } catch (error) {
        console.log('error in runAgain function ...');
    }
}

// This interval is for run the "runAgain" function
setInterval(async () => {
    await runAgain();
}, 1000 * 60 * process.env.MINUTES);

// Login to Discord with your client's token
client.login(process.env.MY_DISCORD_BOT_TOKEN);