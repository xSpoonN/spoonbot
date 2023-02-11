module.exports = {
  name: "listrole",
  description: "List all members of the specified role.",
  arguments: "(Role)",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    const args2 = message.content.split(/\s(.+)/)[1];
    if (!args2) return message.reply("You must specify a role.");
    let roleRequested = message.guild.roles.cache.find(role => role.name === args2);
    if (roleRequested == null) return message.channel.send('Invalid Role');
    message.channel.send("**" + args2 + ":** \n" + roleRequested.members.map(m=>m.user.tag).join('\n'));
  }
}
