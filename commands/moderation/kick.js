const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { color, colorError } = require('../../config.json');
const emojis = require('../../emojis.json');
const Logger = require('leekslazylogger');
const log = new Logger();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Expulser un membre')
        .setDefaultMemberPermissions(0x0000000000000002)
        .addUserOption(option => 
            option
                .setName('target')
                .setDescription('Sélectionner un utilisateur')
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName('reason')
                .setDescription('Donnez une raison')),
	async execute(interaction) {
        if (!interaction.channel.permissionsFor(interaction.client.user).has(PermissionsBitField.Flags.SendMessages)) return; 
        const botPerms = [
            PermissionsBitField.Flags.KickMembers,
        ];
    
        if (!interaction.guild.members.me.permissions.has(botPerms)) {
            return interaction.reply({content: `Veuillez m'ajouter la permission \`KICK_MEMBERS (${botPerms.join(', ')})\` pour que je puisse fonctionner correctement.`, ephemeral: true });
        } else {
            const target = interaction.options.getMember('target');
            const reason = interaction.options.getString('reason');

            const embedError = new EmbedBuilder()
            .setColor(colorError)
            .setTitle(`${emojis.erreur} Erreur`)
            .setDescription('Je ne peux pas expulser cet utilisateur. Cet utilisateur a des autorisations d\'administrateur')

            const embedError2 = new EmbedBuilder()
            .setColor(colorError)
            .setTitle(`${emojis.erreur} Erreur`)
            .setDescription('Tu ne peux pas t\'expulser toi même !')

            if (target.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ embeds: [embedError], ephemeral: true })
            } else if (target.id == interaction.user.id) {
                return interaction.reply({ embeds: [embedError2], ephemeral: true })
            }

            const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Membre expulsé')
            .setDescription(`Expulsé: ${target}\nRaison: \`${reason}\`\nPar: <@${interaction.member.id}>`)
            .setThumbnail(`${target.displayAvatarURL({ dynamic: true })}`)
            
            target.kick();
            await interaction.reply({ embeds: [embed], ephemeral: true });

            log.success(`Membre expulsé (${target}). Raison: ${reason}. Par: ${interaction.member.id}`)
        }
	},
}