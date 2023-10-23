const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log('Asbjørns mor er klar til dig');
});

client.on('messageCreate', (message) => {
    if (message.content === 'asbjørn har en sygdom') {
        message.reply('True');
    }
});

client.login("MTE2MTU2MTM2ODM3ODQ3NDQ5Ng.GJ-bkv.sVDqzohgM1J9sY1tGaSag0MQttWhvWMUKnTdxY");