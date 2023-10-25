require('dotenv').config();
const { REST, Routes, PermissionFlagsBits } = require('discord.js');

const commands = [
    {
        name: 'eow',
        description: 'Svarer: Vil du slås?',
    },
    {
        name: 'assbjørn',
        description: 'Info om Asbjørn',
    },
    {
        name: 'sex',
        description: 'Asbjørns mors tilbud',
    },
    {
        name: 'blowjob',
        description: 'Asbjørns mors tilbud',
    },
    {
        name: 'funny',
        description: 'xD',
    },
    {
        name: 'retard',
        description: 'xD',
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

const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const ms = require('ms');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const mentionable = interaction.options.get('target-user').value;
        const duration = interaction.options.get('duration').value;
        const reason = interaction.options.get('reason')?.value || "Fuck dig";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(mentionable);
        if (!targetUser) {
            await interaction.editReply("Findes ikke lol");
            return;
        }

        if (targetUser.user.bot) {
            await interaction.editReply("Kan ikke timeoute en bot bror");
            return;
        }

        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            await interaction.editReply("Hvorfor skal brugeren dø?");
            return;
        }

        if (msDuration < 5000 || msDuration > 2.419e9) {
            await interaction.editReply("Brugeren kan ikke være død i mindre end 5 sekunder eller mere end 28 dage");
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserPosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("Kan ikke slå en gud ihjel bro");
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("Kan ikke slå en bot ihjel bro");
            return;
        }

        try {
            const { default: prettyMs } = await import('pretty-ms');

            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`er nu død i ${prettyMs(msDuration, { verbose: true })}`);
                return;
            }

            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`er nu død i ${prettyMs(msDuration, { verbose: true })}.\nReason: ${reason}`);
        } catch (error) {
            console.log(`Fiks dig selv: ${error}`);
        }
    },

    name: 'timeout',
    description: 'timeouter en idiot',
    options: [
        {
            name: 'target-user',
            description: 'Brugeren der skal dø',
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'duration',
            description: 'Timeout duration (30m, 1h, 1 day).',
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'Grunden til at brugeren skal dø)',
            type: ApplicationCommandOptionType.Mentionable,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],
}