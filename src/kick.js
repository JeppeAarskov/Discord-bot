require('dotenv').config();
const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /**
     * 
     * @param {*} client 
     * @param {*} interaction 
     */
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "Fuck dig";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply("Bro findes ikke");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("Du kan ikke slette en gud bro");
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserPosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserPosition) {
            await interaction.editReply("Du ka' ikk slette folk der sejere end dig bror");
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("Ka' ikk slette folk der ligeså seje som mig bror");
            return;
        }

        try {
            await targetUser.kick(reason);
            await interaction.editReply(`User ${targetUser} er nu slettet\nReason: ${reason}`);
        } catch (error) {
            console.log(`Fiks dig selv maaan: ${error}`);
        }
    },

    name: 'kick',
    description: 'Sletter en idiot',
    options: [
        {
            name: 'target-user',
            description: 'Brugeren der skal slettes',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'reason',
            description: 'Grund til at brugeren skal slettes',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers],
}