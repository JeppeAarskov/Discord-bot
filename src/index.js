require('dotenv').config();
const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.Guilds,
        Intents.FLAGS.GuildMembers,
        Intents.FLAGS.GuildMessages,
        Intents.FLAGS.MessageContent,
    ],
});

client.once('ready', () => {
    console.log('Asbjørns mor er klar til dig');
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content === 'asbjørn har en sygdom') {
        message.reply('True');
    }

    if (message.content === 'hello') {
        message.reply('Hello fellow nigga<3');
    }
});

client.login(process.env.TOKEN);
