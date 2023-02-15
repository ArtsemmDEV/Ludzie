const { REST } = require("@discordjs/rest");
const { Routes } = require('discord.js');
require('dotenv').config({ path: '.env' })
const Logger = require('leekslazylogger');
const log = new Logger();
const { clientId } = require('./config.json');

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => log.success(`Les commandes ont été supprimées.`))
	.catch(console.error);