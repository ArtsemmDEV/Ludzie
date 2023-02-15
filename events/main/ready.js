const { REST } = require("@discordjs/rest");
const { Routes, ActivityType } = require('discord.js');
const Logger = require('leekslazylogger');
const log = new Logger();
const { clientId, activity, status, url } = require('../../config.json');
require('dotenv').config({ path: '.env' })

module.exports = {
	name: "ready",
	once: true,
	execute(client, commands, message, channels) {
        
		const rest = new REST({ version: "9", }).setToken(process.env.TOKEN);
		(async () => {
			log.success(`Ludzie est prêt à être utilisé !`);
			log.info(`${client.user.tag} a demarré dans ${client.guilds.cache.size} serveurs`);
			const GuildsName = client.guilds.cache.map(guild => guild.name);
			const GuildsID = client.guilds.cache.map(guild => guild.id);
			log.info(GuildsName);
			log.info(GuildsID);

            try {
                log.info('Démarrage de l\'actualisation des commandes d\'application (/).');
        
                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );
        
                log.success('Commandes d\'application (/) rechargées avec succès.');
            } catch (error) {
                log.error(error);
            }
        })();

        

		if (activity === "Listening") {
			client.user.setPresence({ activities: [{type: ActivityType.Listening, name: status}]})
		} else if (activity === "Watching") {
			client.user.setPresence({ activities: [{type: ActivityType.Watching, name: status}]})
		} else if (activity === "Playing") {
			client.user.setPresence({ activities: [{type: ActivityType.Playing, name: status}]})
		} else if (activity === "Competing") {
			client.user.setPresence({ activities: [{type: ActivityType.Competing, name: status}]})
		}
	},
};