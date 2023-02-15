const leeks = require('leeks.js');

const {
	version, license, name, author
} = require('./package.json');
const Logger = require('leekslazylogger');
const log = new Logger();

module.exports = () => {
	console.log(leeks.colours.blue(`
                                                                                                   
8 8888         8 8888      88 8 888888888o.       8888888888',8888'  8 8888 8 8888888888   
8 8888         8 8888      88 8 8888    \`^888.           ,8',8888'   8 8888 8 8888         
8 8888         8 8888      88 8 8888        \`88.        ,8',8888'    8 8888 8 8888         
8 8888         8 8888      88 8 8888         \`88       ,8',8888'     8 8888 8 8888         
8 8888         8 8888      88 8 8888          88      ,8',8888'      8 8888 8 888888888888 
8 8888         8 8888      88 8 8888          88     ,8',8888'       8 8888 8 8888         
8 8888         8 8888      88 8 8888         ,88    ,8',8888'        8 8888 8 8888         
8 8888         \` 8888     ,8P 8 8888        ,88'   ,8',8888'         8 8888 8 8888         
8 8888           8888   ,d8P  8 8888    ,o88P'    ,8',8888'          8 8888 8 8888         
8 888888888888    \`Y88888P'   8 888888888P'      ,8',8888888888888   8 8888 8 888888888888 

    `));
	console.log(leeks.colours.blueBright(`${name} v${version} by ${author}`));
	console.log(leeks.colours.blueBright(`License: ${license}` + '\n'));
    log.success(`Connecté à l'API de Discord !`);
};
