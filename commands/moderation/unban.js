const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { color, colorError } = require('../../config.json');
const emojis = require('../../emojis.json');
const Logger = require('leekslazylogger');
const log = new Logger();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Dé-bannir un membre')
        .setDefaultMemberPermissions(0x0000000000000004)
        .addStringOption(option => 
            option
                .setName('userid')
                .setDescription('Indiquer un utilisateur')
                .setRequired(true)),
	async execute(interaction) {
        if (!interaction.channel.permissionsFor(interaction.client.user).has(PermissionsBitField.Flags.SendMessages)) return; 
        const botPerms = [
            PermissionsBitField.Flags.ManageGuild,
        ];
    
        if (!interaction.guild.members.me.permissions.has(botPerms)) {
            return interaction.reply({content: `Veuillez m'ajouter la permission \`MANAGE_GUILD (${botPerms.join(', ')})\` pour que je puisse fonctionner correctement.`, ephemeral: true });
        } else {
            const userid = interaction.options.getString('userid');

            const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Membre débanni')
            .setDescription(`Débanni: <@${userid}>\nPar: <@${interaction.member.id}>`)

            interaction.guild.bans.fetch().then(async bans => {
                const embedError = new EmbedBuilder()
                .setColor(colorError)
                .setTitle(`${emojis.erreur} Erreur`)
                .setDescription('Aucun utilisateur n\'est banni sur ce serveur')

                const embedError2 = new EmbedBuilder()
                .setColor(colorError)
                .setTitle(`${emojis.erreur} Erreur`)
                .setDescription('Cet utilisateur n\'est pas banni')

                const embedError3 = new EmbedBuilder()
                .setColor(colorError)
                .setTitle(`${emojis.erreur} Erreur`)
                .setDescription('Erreur inconnu')

                if (bans.size === 0) return interaction.reply({ embeds: [embedError], ephemeral: true });

                let BannedUser = bans.find(ban => ban.user.id == userid)
                if (!BannedUser) return interaction.reply({ embeds: [embedError2], ephemeral: true });

                await interaction.guild.members.unban(BannedUser.user).catch(err => {
                    return interaction.reply({ embeds: [embedError3], ephemeral: true });

                }).then(() => {
                    interaction.reply({ embeds: [embed], ephemeral: true});
                    log.success(`Membre débanni (${userid}). Par: ${interaction.member.id}`)
                })
            })
        }
	},
}