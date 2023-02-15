const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { color } = require('../../config.json')
const emojis = require('../../emojis.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Afficher la liste des commandes'),
	async execute(interaction) {

		const help = '`/help` · Afficher la liste des commandes\n';
		const ip = '`/ip` · Afficher la liste des commandes\n';
		const partenariat = '`/partenariat` · Afficher les partenaires de Ludzie\n';
		const ping = '`/ping` · Afficher la latence du bot\n';
		const sayembed = '`/say-embed` · Envoyer un embed custom\n';
		const serverinfo = '`/serverinfo` · Obtenir des informations sur le serveur\n';
		const userinfo = '`/userinfo` · Obtenir des informations sur l\'utilisateur\n';
		const weather = '`/weather` · Obtenir des informations météorologiques\n';
		const ban = '`/ban` · Bannir un membre\n';
		const kick = '`/kick` · Expulser un membre\n';
		const purge = '`/purge` · Supprimer des messages en masse\n';
		const slowmode = '`/slowmode` · Mettre le channel en mode lent\n';
		const unban = '`/unban` · Dé-bannir un membre\n';

		const getCommandesName = [help + ip + partenariat + ping + sayembed + serverinfo + userinfo + weather + ban + kick + purge + slowmode + unban]

        const embed = new EmbedBuilder()
		.setColor(color)
		.setTitle(`${emojis.info} Help`)
		.setDescription(`Les commandes auxquelles vous avez accès sont répertoriées ci-dessous.\n\n__**Commandes**__:\n${getCommandesName}`)

		await interaction.reply({ embeds: [embed], ephemeral: true });

	},
};