cfigs = require("../../config.json");

module.exports = {
  name: "delrole",
  description: "Removes a role from the specified user",
  arguments: "(user) (role)",
  permissions: "Manage Roles",
  cooldown: 1,
  execute(message, args) {
    const guildMember = message.member;
    const member = message.author;
    const args3 = message.content.split(' ').slice(2).join(" ");
    const firstMember = message.mentions.members.first();
    const firstMention = message.mentions.users.first();

    if (cfigs["disable_delrole"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_ROLES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    if (!args3 || !firstMention || args[0] == undefined) return message.channel.send('You must specify a Role and a user.');
    let roleDischarge = message.guild.roles.cache.find(role => role.name === args3);
    if (roleDischarge == null) return message.channel.send('Invalid Role');
    if (!firstMember.roles.cache.has(roleDischarge.id)) return message.channel.send("That user doesn't have that role!");
    firstMember.roles.remove(roleDischarge).catch(e => { return message.channel.send("An Error Occured! I might not permissions to do that.") });
    message.channel.send("Removed role **" + args3 + "** from " + firstMember.displayName + ".");
  }
}
