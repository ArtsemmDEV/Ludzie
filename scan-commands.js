const fs = require("fs");
module.exports = {
    name: "scan-commands",
    execute() {
   
        const commandsFolder = fs.readdirSync('./commands');
        for (const folder of commandsFolder) {
            const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
            for (const file of commandsFiles) {
                const command = require(`./commands/${folder}/${file}`);
            }
    }
}
}