cfigs = require("../../config.json");

module.exports = {
  name: "addrole",
  description: "Adds a role to the specified user.",
  arguments: "(user) (role)",
  permissions: "Manage Roles",
  cooldown: 1,
  execute(message, args) {
    const guildMember = message.member;
    const member = message.author;
    const args3 = message.content.split(' ').slice(2).join(" ");
    const firstMember = message.mentions.members.first();
    const firstMention = message.mentions.users.first();

    if (cfigs["disable_addrole"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_ROLES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (!args3 || !firstMention || args[0] == undefined) return message.channel.send('You must specify a Role and a user.');
    let roleAssign = message.guild.roles.cache.find(role => role.name === args3);
    if (roleAssign == null) return message.channel.send('Invalid Role');
    if (firstMember.roles.cache.has(roleAssign.id)) return message.channel.send("That user already has that role!");
    firstMember.roles.add(roleAssign).catch(e => { return message.channel.send("An Error Occured! I might not permissions to do that.") });
    message.channel.send("Added role **" + args3 + "** to " + firstMember.displayName + ".");
  }
}
