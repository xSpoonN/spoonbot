cfigs = require("../../config.json");

module.exports = {
  name: "listemojis",
  description: "Lists all emojis in the server",
  arguments: "None",
  permissions: "None",
  cooldown: 1,
  execute(message, args) {
    if (cfigs["disable_listemojis"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    const emojis = message.guild.emojis.cache.map(emoji => emoji.toString());
    const numberOfMessages = Math.ceil(emojis.join(" ").length / 2000)*2;
    const charactersPerMessage = Math.floor(emojis.length/numberOfMessages);
    for (i = 0; i < numberOfMessages; i++) {
      message.channel.send(
        emojis.slice(i * charactersPerMessage, (i + 1) * charactersPerMessage).join(" ")
      );
    }
  }
}
