require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
const { OpenAI } = require('openai');

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

    client.user.setActivity({
        name: 'Asbjørn er homo',
        type: ActivityType.Watching,
    });
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

client.on('messageCreate', async (message) => {
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

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                // name:
                role: 'system',
                content: 'Asbjørns mor er klog'
            },
            {
                // name:
                role: 'user',
                content: message.content,
            }
        ],
    })
    .catch((error) => console.error('OpenAI Error:\n', error));

    message.reply(response.choices[0].message.content);
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
        const embed = new EmbedBuilder()
            .setTitle("Blowjob")
            .setDescription("Sygt billigt")
            .setColor('Random')
            .addFields({
                name: 'Pris:',
                value: '10kr',
            })
            .addFields({
                name: 'Booking:',
                value: 'https://www.youtube.com/watch?v=2qgxAHW1w78&ab_channel=Kamiicin',
            });
        interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === 'funny') {
        interaction.reply('https://www.youtube.com/watch?v=m6Y_6Ssxt5k&ab_channel=JepperDebber');
    }

    if (interaction.commandName === 'retard') {
        interaction.reply('https://www.youtube.com/watch?v=0VxT-c36IiQ&ab_channel=WalkersFilms');
    }

    console.log(interaction.commandName);
});

client.login(process.env.TOKEN);
