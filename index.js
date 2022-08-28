/*
    This is a simple bot for discord to take the lastest images uploaded
    and use that image for your windows background image
*/

import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import changeImage from './saveWallpaper.js';

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
        if(msg.channelId != process.env.DETECT_THIS_CHANNEL) return;
        
        // if the message dont has image
        await msg;
        if(typeof msg.embeds[0].image == 'undefined') return console.log('last message dont has image.');
        if(typeof msg.embeds[0].image.url == 'undefined') return console.log('last message dont has image.');
        
        // if he menssage has image
        console.log('actual donwloaded image => ',msg.embeds[0].image.url);
        await changeImage(msg.embeds[0].image.url);
        
    } catch (error) {
        console.log('something wrong ...');
        console.log(error.reason);
        console.log('-------');
        console.log('the script still waiting for the next image ...');
    }
});

// Login to Discord with your client's token
client.login(process.env.MY_DISCORD_BOT_TOKEN);