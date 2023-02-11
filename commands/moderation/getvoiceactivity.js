cfigs = require("../../config.json");

module.exports = {
  name: "getvoiceactivity",
  description: "Gets a random channel from all the active voice channels in a certain server.",
  arguments: "None",
  permissions: "Manage Messages",
  cooldown: 1,
  execute(message, args) {
    if (message.author.id != "[Omitted]") return message.channel.send("You're not morbius <:mikeySusge:911471618096791573>");
    if (message.channel.id != "[Omitted]") return message.channel.send("Wrong channel.");
    const server = message.client.guilds.cache.get("[Omitted]");
    const channels = server.channels.cache.filter(channel => channel.type === 'voice' && channel.members.size != 0);
    if (!channels.size) return message.channel.send(";voice_channel 0");
    return message.channel.send(";voice_channel " + channels.random().id);
  }
}
