const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const weather = require('weather-js');
const { color, colorError } = require('../../config.json');
const emojis = require('../../emojis.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Obtenir des informations météorologiques')
        .addStringOption(option => 
            option
                .setName('target')
                .setDescription('Sélectionner une location')
                .setRequired(true)),
	async execute(interaction) {
        const location = interaction.options.getString('target');
		weather.find({search: `${location}`, degreeType: `C`}, function (error, result) {

            const embedError = new EmbedBuilder()
            .setColor(colorError)
            .setTitle(`${emojis.erreur} Erreur`)
            .setDescription(`Localisation invalide !`)

            if(result === undefined || result.length === 0) return interaction.reply({ embeds: [embedError], ephemeral: true});

            var current = result[0].current;
            var location = result[0].location;

            const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`Météo: ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setDescription(`**${current.skytext}**`)
            .addFields(
                { name: 'Fuseau horaire', value: `UTC ${location.timezone}`, inline: true },
                { name: 'Type de degré', value: `Celsius`, inline: true },
                { name: 'Température', value: `${current.temperature}°C`, inline: true },
                { name: 'Vent', value: `${current.winddisplay}`, inline: true },
                { name: 'Température ressentie', value: `${current.feelslike}°C`, inline: true },
                { name: 'Humidité', value: `${current.humidity}%`, inline: true }
            )

            interaction.reply({ embeds: [embed], ephemeral:true });
        })    
	},
}