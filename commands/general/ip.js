const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Afficher l\ip de Keozia (Serveur Partenaire)'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`IP`)
            .setDescription(`L'ip du serveur Koezia est indisponnible !`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};