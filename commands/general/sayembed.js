const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { color, colorError } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say-embed')
		.setDescription('Envoyer un embed custom')
        .setDefaultMemberPermissions(0x0000000000000010)
        .addStringOption(option => 
            option
                .setName('title')
                .setDescription('Ajouter un titre')
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName('description')
                .setDescription('Ajouter une description')
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName('thumbnail')
                .setDescription('Ajouter une miniature')
                .setRequired(false))
        .addStringOption(option => 
            option
                .setName('image')
                .setDescription('Ajouter une image')
                .setRequired(false)),
	async execute(interaction) {
        if (!interaction.channel.permissionsFor(interaction.client.user).has(PermissionsBitField.Flags.SendMessages)) return; 
        const botPerms = [
            PermissionsBitField.Flags.SendMessagesInThreads,
        ];
    
        if (!interaction.guild.members.me.permissions.has(botPerms)) {
            return interaction.reply({content: `Veuillez m'ajouter la permission \`SEND_MESSAGES_IN_THREADS (${botPerms.join(', ')})\` pour que je puisse fonctionner correctement.`, ephemeral: true });
        } else {
            const title = interaction.options.getString('title');
            const description = interaction.options.getString('description');
            const thumbnail = interaction.options.getString('thumbnail');
            const image = interaction.options.getString('image');

            if (thumbnail && image) {
                const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(`${title}`)
                .setDescription(`${description}`)
                .setThumbnail(`${thumbnail}`)
                .setImage(`${image}`)
                interaction.channel.send({ embeds: [embed] })
            } else if (thumbnail) {
                const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(`${title}`)
                .setDescription(`${description}`)
                .setThumbnail(`${thumbnail}`)
                interaction.channel.send({ embeds: [embed] })
                
            } else if (!thumbnail && !image) {
                const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(`${title}`)
                .setDescription(`${description}`)
                interaction.channel.send({ embeds: [embed] })
            }

            const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle('Embed')
                .setDescription(`L'embed a bien été envoyé !`)

            interaction.reply({ embeds: [embed],  ephemeral: true });
        
        }
	},
};