cfigs = require("../../config.json");

module.exports = {
  name: "insult",
  description: "Insults the target",
  arguments: "(user)",
  permissions: "None",
  cooldown: 1,
  execute(message, args) {
    const firstMention = message.mentions.users.first();
    const insultResp = [
      "You look like an orc.",
      "Not even a dementor would kiss you."
    ];
    if (cfigs["disable_insult"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (firstMention == null) return message.channel.send("You must specify a user to insult.");
    message.channel.send(`<@${firstMention.id}>, ` + insultResp[Math.floor(Math.random() * insultResp.length)]);
  }
}
