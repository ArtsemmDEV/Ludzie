const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { color } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Obtenir des informations sur le serveur'),
	async execute(interaction) {
		const { guild } = interaction 

        const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(`Informations: ${guild.name}`)
        .setThumbnail(`${guild.iconURL({ dynamic: true })}`)
        .addFields(
                { name: 'Propriétaire du serveur', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'ID du serveur', value: `${guild.id}`, inline: true },
                { name: 'Date de création du serveur', value: `${guild.createdAt.toDateString()}`, inline: true },
                { name: 'Membres', value: `${guild.memberCount}`, inline: true },
                { name: 'Rôle le plus élevé', value: `${guild.roles.highest}`, inline: true },
                { name: 'Boot du serveur', value: `Nombre de Boosts: ${guild.premiumSubscriptionCount}\nNiveau de Boosts: ${guild.premiumTier}`, inline: true },
            )
                
        await interaction.reply({ embeds: [embed], ephemeral:true });
	},
}