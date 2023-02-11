cfigs = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "8ball",
  description: "Answers your burning questions",
  arguments: "(query)",
  permissions: "None",
  cooldown: 1,
  execute(message, args) {
    const member = message.author;
    const guildMember = message.member;
    const firstMention = message.mentions.users.first();
    const firstMember = message.mentions.members.first();
    const ballResp = [
      'It is certain', 'It is decidedly so',
      'Without a doubt', 'Yes definitely',
      'Highly unlikely', 'Absolutely',
      'You may rely on it', 'As I see it, yes',
      'Most likely', 'Outlook good',
      'Yes', 'Signs point to yes',
      'Reply hazy try again', 'Ask again later',
      'Better not tell you now', 'Cannot predict now',
      'Concentrate and ask again', 'Don\'t count on it',
      'My reply is no', 'My sources say no',
      'Outlook not so good', 'Very doubtful',
      'Ask Jason', 'Maybe',
      'Supposedly, Yes', 'Aye',
      'Nay', 'Heavens, no',
      'Necessarily.', 'It is inevitable',
      'Never', 'Obviously so',
      'Yeah', 'Of course'
    ];
    const fruitResp = [
      'Watermelon', 'Pineapple', 'Dragonfruit', 'Jackfruit',
      'Coconut', 'Papaya', 'Pumpkin', 'Cantaloupe'
    ];
    const generalFoodResp = [
      'Watermelon', 'Pineapple',
      'Dragonfruit', 'Jackfruit',
      'Coconut', 'Papaya',
      'Pumpkin', 'Bok Choy',
      'Radish', 'Cabbage',
      'Cantaloupe'
    ];
    if (cfigs["disable_8ball"].value.toLowerCase() == "true") return message.channel.send("This command is disabled.");
    if (message.content.toLowerCase().includes("fruit")) {
      message.channel.send({embed: {
        title: "Input: " + message.cleanContent.slice(6),
        description: "**>** " + fruitResp[Math.floor(Math.random() * fruitResp.length)],
        author: {
          name: message.client.user.username,
          icon_url: 'http://www.iconninja.com/files/776/590/392/ball-icon.png'
        },
        color: 10436608,
        footer: {
          text: 'Asked by ' + member.username
        }
    	 }});
    } else if (message.content.toLowerCase().includes("food")) {
      message.channel.send({embed: {
        title: "Input: " + message.cleanContent.slice(6),
        description: "**>** " + generalFoodResp[Math.floor(Math.random() * generalFoodResp.length)],
        author: {
          name: message.client.user.username,
          icon_url: 'http://www.iconninja.com/files/776/590/392/ball-icon.png'
        },
        color: 10436608,
        footer: {
          text: 'Asked by ' + member.username
        }
      }});
    } else {
      message.channel.send({embed: {
        title: "Input: " + message.cleanContent.slice(6),
        description: "**>** " + ballResp[Math.floor(Math.random() * ballResp.length)],
        author: {
          name: message.client.user.username,
          icon_url: 'http://www.iconninja.com/files/776/590/392/ball-icon.png'
        },
        color: 10436608,
        footer: {
          text: 'Asked by ' + member.username
        }
    	 }});
    }
  }
}
