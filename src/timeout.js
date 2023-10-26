require('dotenv').config();
const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

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