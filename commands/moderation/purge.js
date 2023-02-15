const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { color, colorError } = require('../../config.json');
const emojis = require('../../emojis.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Supprimer des messages en masse')
        .setDefaultMemberPermissions(0x0000000000002000)
        .addNumberOption(option => 
            option
                .setName('number')
                .setDescription('Indiquer un numéro 1 - 99')
                .setMinValue(1)
                .setMaxValue(99)
                .setRequired(true)),
	async execute(interaction) {
        if (!interaction.channel.permissionsFor(interaction.client.user).has(PermissionsBitField.Flags.SendMessages)) return; 
        const botPerms = [
            PermissionsBitField.Flags.ManageMessages,
        ];
    
        if (!interaction.guild.members.me.permissions.has(botPerms)) {
            return interaction.reply({content: `Veuillez m'ajouter la permission \`MANAGE_MESSAGES (${botPerms.join(', ')})\` pour que je puisse fonctionner correctement.`, ephemeral: true });
        } else {
            const number = interaction.options.getNumber('number');
        
            const amount = parseInt(number) + 1;

            const embedError = new EmbedBuilder()
            .setColor(colorError)
            .setTitle(`${emojis.erreur} Erreur`)
            .setDescription('Je ne peux pas expulser cet utilisateur. Cet utilisateur a des autorisations d\'administrateur')

            interaction.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                interaction.reply({ embeds: [embedError], ephemeral: true });
            });

            const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Messages supprimés')
            .setDescription(`Nombre de messages supprimés: \`${number}\``)
            
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
	},
}