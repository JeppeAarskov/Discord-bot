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

    if (message.author.id === '363054980388618241') {
        message.reply('stfu bitch');
    }

    if (message.content === 'asbjørn har en sygdom') {
        message.reply('True');
    }

    if (message.content === 'hello') {
        message.reply('Hello fellow nigga<3');
    }

    if (message.content === 'sutsut') {
        message.reply('Pris: 10kr.. Adresse: Under din seng');
    }

    if (message.content === 'sex') {
        message.reply('Børn?');
    }

    if (message.content === 'alex') {
        message.reply('er klogere end Asbjørn lol');
    }

    if (message.content === 'asbjørn') {
        message.reply('får aldrig en kæreste');
    }

    if (message.content === 'jeppe') {
        message.reply('er Asbjørns crush');
    }

    if (message.content === 'rosby') {
        message.reply('er Asbjørns ejer');
    }

    if (message.content === 'adnan') {
        message.reply('elsker Emilia');
    }

    if (message.content === 'cubecrafter') {
        message.reply('elsker når spil ikke virker');
    }

    if (message.content === 'Alex') {
        message.reply('er klogere end Asbjørn lol');
    }

    if (message.content === 'Asbjørn') {
        message.reply('får aldrig en kæreste');
    }

    if (message.content === 'Jeppe') {
        message.reply('er Asbjørns crush');
    }

    if (message.content === 'Rosby') {
        message.reply('er Asbjørns ejer');
    }

    if (message.content === 'Adnan') {
        message.reply('elsker Emilia');
    }

    if (message.content === 'Cubecrafter') {
        message.reply('elsker når spil ikke virker');
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

    if (interaction.commandName === 'blowjob') {
        interaction.reply('Pris: 10kr... Adresse: Under din seng');
    }

    if (interaction.commandName === 'funny') {
        interaction.reply('https://www.youtube.com/watch?v=0VxT-c36IiQ');
    }

    console.log(interaction.commandName);
});

client.login(process.env.TOKEN);
