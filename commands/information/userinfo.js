const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const moment = require('moment');
const { color } = require('../../config.json');
moment.locale('fr')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Obtenir des informations sur l\'utilisateur')
        .addUserOption(option => 
            option
                .setName('target')
                .setDescription('Sélectionner un utilisateur')
                .setRequired(true)),
	async execute(interaction) {
		const target = interaction.options.getUser('target');

        const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(`Informations de ${target.tag}`)
        .addFields(
            { name: 'Mention', value: `<@${target.id}>`, inline: true },
            { name: 'Nom d\'utilisateur', value: `${target.tag}`, inline: true },
            { name: 'ID de l\'utilisateur', value: `${target.id}` },
            { name: 'Compte créé le', value: `${moment.utc(target.createdAt).format('LLLL')}` },
            { name: 'A rejoint le', value: `${moment.utc(target.joinedAt).format('LLLL')}` }
        )
        .setThumbnail(target.avatarURL({ dynamic: true }))
        
        await interaction.reply({ embeds: [embed], ephemeral:true });
	},
}