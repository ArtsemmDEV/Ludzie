const Logger = require('leekslazylogger');
const log = new Logger();
const { PermissionsBitField  } = require('discord.js');

module.exports = {
	name: "interactionCreate",

	async execute(interaction) {

		if (!interaction.isChatInputCommand() || interaction.isUserContextMenuCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);

            log.info(`${interaction.user.tag} (${interaction.user.id}) a exécuté /${command.data.name}.` );
        } catch (error) {
            await interaction.reply({ content: `Une erreur s'est produite lors de l'exécution de cette commande. Rejoignez le [SUPPORT](<https://pleven-dev.fr>) pour signaler cette erreur !\n\`${error}\``, ephemeral: true });
			log.error(error)

        }

        
	}
}