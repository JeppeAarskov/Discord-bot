require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'eow',
        description: 'Svarer: Vil du slås?',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Reparerer Asbjørns mor...');
        
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Asbjørns mor kan nu trylle')
    } catch (error) {
        console.log(`Bruh der var en fejl. Fiks dig selv: ${error}`);
    }
})();