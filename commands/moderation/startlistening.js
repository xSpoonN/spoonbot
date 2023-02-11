cfigs = require("../../config.json");

module.exports = {
  name: "startlistening",
  description: "Starts listening for active speakers in the specified channel.",
  arguments: "(channel id)",
  permissions: "None",
  cooldown: 0,
  async execute(message, args) {
    if (message.author.id != "[Omitted]") return message.channel.send("You're not morbius <:mikeySusge:911471618096791573>");
    if (message.channel.id != "[Omitted]") return message.channel.send("Wrong channel.");
    const server = message.client.guilds.cache.get("[Omitted]");
    const currentCh = message.client.channels.cache.get("[Omitted]");
    const afkch = message.client.channels.cache.get("[Omitted]"); await afkch.join();
    if (!args[0]) return message.channel.send("You must provide a channel id!");
    var current = new Date(); const baseTime = current.getTime()/1000;
    while (true) {
      var current = new Date(); const currentTime = await current.getTime()/1000;
      if (currentTime - baseTime >= 60) break; var stop = false;
      const end = await currentCh.messages.fetch({limit:1}).then(messages => {
        const msgs = messages.filter(m => m.author.id === "[Omitted]");
        if (msgs.some(a => a.content == "~stoplistening")) stop = true;
      })
      if (stop) break;
      const speaking = await server.voiceStates.cache.filter(vs => vs.channelID == args[0])
      var anyspeaking = speaking.some(a => a.speaking === true);
      if (anyspeaking) return message.channel.send(`;speaker_detected ${args[0]}`);
    }
    await afkch.leave(); return message.channel.send("Request timed out or was terminated.");
  }
}
