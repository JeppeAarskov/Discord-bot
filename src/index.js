require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
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

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'eow') {
        interaction.reply('Vil du slås?');
    }

    if (interaction.commandName === 'assbjørn') {
        interaction.reply('*opkast*');
    }

    if (interaction.commandName === 'sex') {
        interaction.reply('Jeg er Asbjørns mor, og jeg er klar på alt, hvis du giver samtykke til at min 3 tons kropsvægt vil trykke dig helt flad og din pung bliver tømt<3');
    }

    console.log(interaction.commandName);
});

client.login(process.env.TOKEN);
