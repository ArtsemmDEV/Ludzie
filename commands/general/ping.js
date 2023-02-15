const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Afficher la latence du bot'),
	async execute(interaction) {

		const mesg = await interaction.reply({ content: "Pong!", fetchReply: true });
		const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`Latence`)
            .setDescription(`Latence du bot: \`${mesg.createdTimestamp - interaction.createdTimestamp}ms\`\nLatence de l'API: \`${interaction.client.ws.ping}ms\``)

            await interaction.editReply({ embeds: [embed], ephemeral: true });
	},
};