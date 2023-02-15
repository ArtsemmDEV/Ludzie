process.title = 'Ludzie | Matéo Moreau (pleven-dev.fr';
process.removeAllListeners('warning');
const { spawnSync } = require("child_process");
const { resolve } = require("path");
const cmd2 = "clear";
spawnSync(cmd2, { stdio: "inherit", shell: true });
require('dotenv').config({ path: '.env' })
const Logger = require('leekslazylogger');
const log = new Logger();
const { Client, GatewayIntentBits, Collection, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require("fs");

const commands = [];
client.commands = new Collection();

require('./banner')();
console.log('\n-----------------------------\n')

const commandsFolder = fs.readdirSync('./commands');
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
	    commands.push(command.data.toJSON());
	    client.commands.set(command.data.name, command);
		log.info(`Commande chargé: ${command.data.name}`);
    }
}

console.log('\n-----------------------------\n')

const eventsFolder = fs.readdirSync('./events');
for (const folder of eventsFolder) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of eventFiles) {
	    const event = require(`./events/${folder}/${file}`);
	    if (event.once) {
		    client.once(event.name, (...args) => event.execute(...args, commands));
			log.info(`Événement chargé: ${event.name}`);
	    } else {
		    client.on(event.name, (...args) => event.execute(...args, commands));
			log.info(`Événement chargé: ${event.name}`);
	    }
    }
}

console.log('\n-----------------------------\n')


client.login(process.env.TOKEN);