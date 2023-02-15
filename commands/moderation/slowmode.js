const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Mettre le channel en mode lent')
        .setDefaultMemberPermissions(0x0000000000000010)
        .addNumberOption(option => 
            option
                .setName('number')
                .setDescription('Indiquer un numéro (mettre en secondes)')
                .setRequired(true)),
	async execute(interaction) {
        if (!interaction.channel.permissionsFor(interaction.client.user).has(PermissionsBitField.Flags.SendMessages)) return; 
        const botPerms = [
            PermissionsBitField.Flags.ManageChannels,
        ];
    
        if (!interaction.guild.members.me.permissions.has(botPerms)) {
            return interaction.reply({content: `Veuillez m'ajouter la permission \`MANAGE_CHANNELS (${botPerms.join(', ')})\` pour que je puisse fonctionner correctement.`, ephemeral: true });
        } else {
            const number = interaction.options.getNumber('number');

            interaction.channel.setRateLimitPerUser(number); {
                const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle('Slowmode')
                .setDescription(`Le mode lent de ce channel a été defini à **${number}** secondes`)
                interaction.reply({ embeds: [embed] });
            }
        }
	},
}