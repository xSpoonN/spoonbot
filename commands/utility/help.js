const {prefix} = require("../../config.json");

module.exports = {
  name: "help",
  description: "Lists all commands",
  arguments: "[command]",
  permissions: "None",
  cooldown: 1,
  execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
      data.push("All available commands:");
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can enter ~help [command name] to show details for a command.`);
			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Check your DMs.');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply("Could not send DM, what you don't like me?");
				});
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Invalid Command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
		if (command.permissions) data.push(`**Permissions:** ${command.permissions}`);

		message.channel.send(data, { split: true });
  }
}
