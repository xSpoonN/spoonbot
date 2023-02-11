cfigs = require("../../config.json");

module.exports = {
  name: "cleanse",
  description: "Deletes specified number of messages [from user]. Does not work for messages ogver 2 weeks old.",
  arguments: "(amount) [user]",
  permissions: "Administrator",
  cooldown: 1,
  execute(message, args) {
    const firstMention = message.mentions.users.first();
    const guildMember = message.member;
    const member = message.author;

    if (cfigs["disable_cleanse"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (!guildMember.hasPermission('MANAGE_MESSAGES') && member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    if (!amount && !firstMention) return message.channel.send('Must specify a user and amount, or just an amount, of messages to cleanse');
    if (!amount) return message.reply('Specify amount of messages to cleanse');
    message.channel.messages.fetch({
      limit: amount+1,
    }).then((messages) => {
      if (firstMention) {
        const filterBy = firstMention ? firstMention.id : Client.firstMention.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount+1);
      }
      try {
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        if (message.mentions.users.first() == null) {
          message.channel.send("Cleansed **" + amount + "** messages.")
        } else {
          message.channel.send("Cleansed **" + amount + "** messages from user " + firstMention)
        }
      } catch(error) {
        message.channel.send('An Error Occured! I might not permissions to do that.');
      }
    });
  }
}
