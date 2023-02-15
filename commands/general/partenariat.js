const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { toreya, koezia } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('partenariat')
		.setDescription('Afficher les partenaires de Ludzie')
		.addSubcommand(optt =>
			optt
				.setName('koezia')
				.setDescription('Informations sur le partenaire Koezia'))
		.addSubcommand(optt =>
			optt
				.setName('toreya')
				.setDescription('Informations sur le partenaire Toreya'))
		.addSubcommand(optt =>
			optt
				.setName('aries')
				.setDescription('Informations sur le partenaire Aries')),
	async execute(interaction) {
		const subCmd = interaction.options.getSubcommand()

		if (subCmd === 'koezia') {
		const embed = new EmbedBuilder()
			.setColor(koezia)
			.setTitle(`<:koezia:1010201812600639528> Koezia - Partenaire`)
			.setDescription(`***__Aujourd'hui nous allons vous présentez Koezia ! __***\n*Nous sommes un Serveur UHC qui propose 3 modes de jeux avec des mécaniques complétements folles !*\n\nEntre **Darling in The Franxx UHC**, **HxH UHC** et **Cartoon UHC**, vous allez avoir le choix ! 
			`)

			const discordLink = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Discord')
					.setStyle(ButtonStyle.Link)
					.setURL("https://discord.gg/6bvZAJff8s")
			);

		await interaction.reply({ embeds: [embed], components: [discordLink], ephemeral: true });
		} else if (subCmd === 'toreya') {
		const embed = new EmbedBuilder()
			.setColor(toreya)
			.setTitle(`<:toreya:1010201937288888451> Toreya - Partenaire`)
			.setDescription(`***__Bienvenue sur le serveur Toreya. __*** 👼\n\nNous souhaitons faire de Toreya la référence francophone et la principale source d’échange entre développeurs évoluant dans le milieu professionnel.\n\n*En tant que développeur web, j’ai toujours déploré la faible représentation de la communauté francophone dans la sphère professionnelle.
			Combien de fois, chers collègues développeurs, n’avez-vous eu comme seule référence technique les documents partagés par la communauté anglophone ?*\n\n**__Alors n'attend pas et laisse toi dans le développement nous sommes une joyeuse deuxième famille ! __ **\n\n
			`)
			
			const discordLink = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Discord')
					.setStyle(ButtonStyle.Link)
					.setURL("https://discord.gg/WNn6ZaUPTY")
			);

			const websiteLink = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Site Web')
					.setStyle(ButtonStyle.Link)
					.setURL("https://toreya.pleven-dev.fr")
			);

		await interaction.reply({ embeds: [embed],  components: [discordLink, websiteLink], ephemeral:true });
		} else if (subCmd === 'aries') {
			const embed = new EmbedBuilder()
				.setColor(toreya)
				.setTitle(`・ARIES UHC - Partenaire`)
				.setDescription(`***Qu'est-ce que Aries UHC ?*** \n**Aries UHC est un serveur communautaire d'Host de parties d'UHC créé en 2022 !**\n\n🎲・De **NOMBREUSES PARTIES** sont organisées sur différents modes de jeux. \n👨🏻‍💻・Nous saurons également vous proposer des modes de jeux **UNIQUES**. *Ces modes de jeu sont actuellement en développement mais en attendant, sur notre 
				serveur sont publiées de NOMBREUSES INFORMATIONS sur les modes de jeux 
				(spoils, annonces, mises-à-jours...).*\n\n**👊・N'hésitez pas à nous rejoindre !**`)
				
				const discordLink = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('Discord')
						.setStyle(ButtonStyle.Link)
						.setURL("https://discord.gg/wF3N8YAAMR")
				);
	
	
			await interaction.reply({ embeds: [embed],  components: [discordLink], ephemeral:true });
			}
	},
};