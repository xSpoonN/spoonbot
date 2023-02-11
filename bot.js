const { Client, Attachment } = require("discord.js"); const Discord = require("discord.js"); const fs = require("fs");
const urban = require('relevant-urban'); const client = new Discord.Client(); const GoogleImages = require('google-images');
const clientSearch = new GoogleImages('[Omitted]', '[Omitted]')
client.cfigs = require("./config.json"); const discord_token = "[Omitted]";
const prefix = client.cfigs["prefix"].value; client.responses = require("./responses.json");
const picRespObject = {
  "lurie": "https://cdn.discordapp.com/attachments/423679709923246080/427958002985992213/LURIE.png",
  "hansen": "https://cdn.discordapp.com/attachments/304786838730833930/321369149853007882/Screenshot_20170601-205712.jpg",
  "no u": "https://cdn.discordapp.com/attachments/423679709923246080/435961291254005761/8bxeJeS.jpg",
  "mikeys house": "https://cdn.discordapp.com/attachments/582197467752169474/598714999841751051/image0.png",
  "gigamikey": "https://cdn.discordapp.com/attachments/606325876052852736/955131655788576768/GIGAMIKEY.png",
};
const godResp = [
  'Ommitted.', 'Ommitted.', 'Ommitted.', 'Ommitted.', 'Ommitted.'
];
const pingResp = [
  '<:mikeyWokege:911471618012893265>', '<:mikeySusWokege:912373573820235876>',
  '<:mikeyBedge:911471618000293979>', '<:mikeyStarege:925525690160394240>',
  '<:wikey:911471617836716032>', '<a:mikeyCheck:928773466990206977>',
  '<a:meepoLeave:925506679653666857>', '<a:meepoArrive:925498938021257296>',
  '<:mikeyAYAYA:911471618105180160>',
  'You tryna start somethin buddy?',
  'You called?', 'Hello, fellow humans! Ha Ha',
  "There's a platypus controlling me.", "Do you mock me, child?",
  "Silence, brother.",
  "I am shepard of change, a beacon of finality.", "Petulant child.",
  "The end is nigh.", "Your narrow scope of reason tickles me.",
  "Nice to meet you! (It's not even that nice to meet you hahahaha)"
];

client.commands = new Discord.Collection(); client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.login(discord_token);
client.on("ready", () => {
  console.log("Bot Online."); client.user.setStatus('dnd');
  client.user.setActivity('Jason <3',{type:'STREAMING',url:'https://www.twitch.tv/'});
  var schedule = require('node-schedule-tz');
  schedule.scheduleJob("0 0 * * *", () => {
    if (client.cfigs["disable_qotd"].value.toLowerCase() != "true") {
      var data = fs.readFileSync('qotd.txt', 'UTF-8').split(/\r?\n/);
      if (data[1] == null) return client.channels.cache.get(client.cfigs["qotdchannel"].value).send({files:["https://media.discordapp.net/attachments/606325876052852736/955583879232766042/mikeyMind.png"]});
      var titleFinal = ""; var descFinal = ""; if (data[1].length >= 256) descFinal = "**" + data[1] + "**"; else titleFinal = data[1];
      var imgdata = fs.readFileSync('qotdimg.txt', 'UTF-8').split(/\r?\n/);
      if (imgdata[1] == null) {
        client.channels.cache.get(client.cfigs["qotdchannel"].value).send({embed: {
          color: 3447003,
          author: {
            name: "QUESTION OF THE DAY",
            icon_url: client.user.avatarURL()
          },
          title: titleFinal,
          description: descFinal,
          timestamp: new Date(),
          footer: {
            text: client.user.username
          }
        }}).catch(e => {console.error(e)});
      } else client.channels.cache.get(client.cfigs["qotdchannel"].value).send({embed: {
        color: 3447003,
        author: {
          name: "QUESTION OF THE DAY",
          icon_url: client.user.avatarURL()
        },
        title: titleFinal,
        description: descFinal,
        timestamp: new Date(),
        image: {
          url: imgdata[1],
        },
        footer: {
          text: client.user.username
        }
      }}).catch(e => {console.error(e)});
      data.splice(1,1);
      imgdata.splice(1,1);
      fs.writeFile('qotd.txt', data.join("\n"), err => { if (err)  {console.error(err); return client.channels.cache.get(client.cfigs["qotdchannel"].value).send("An Error Occured!");}})
      fs.writeFile('qotdimg.txt', imgdata.join("\n"), err => { if (err)  {console.error(err); return client.channels.cache.get(client.cfigs["qotdchannel"].value).send("An Error Occured!");}})
    }
  });
});
client.on("message", async message => {
  //Prevents Self Loops
  if (message.author.id === client.user.id) return;
  
  const guildMember = message.member;
  const member = message.author;
  try {
    if (guildMember.roles.cache.some(role => role.name === client.cfigs["peasant"].value)) { message.delete();}
  } catch(error) {}
  if (guildMember.roles.cache.has("[Omitted]")) {
    if (message.author.id != "[Omitted]") guildMember.roles.remove(message.guild.roles.cache.get("[Omitted]"));
  }

  //Reactions
  if (client.cfigs[member.id] && client.cfigs[member.id].value != 0) {
    if (client.cfigs["disable_reactions"].value != "true") {
      let value = client.cfigs[member.id].value;
      if (value.substring(value.length-1) == ">") {
        message.react(value.substring(0,value.length-1)).catch();
      } else {
        message.react(value).catch();
      }
    }
  }

  //Command Handler
  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (command && message.content.startsWith(prefix)) {
    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
  	const timestamps = cooldowns.get(command.name);
  	const cd = (command.cooldown || 3) * 1000;
  	if (timestamps.has(message.author.id)) {
  		const expirationTime = timestamps.get(message.author.id) + cd;
  		if (now < expirationTime) {
  			const timeLeft = (expirationTime - now) / 1000;
  			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
  		}
  	}
  	timestamps.set(message.author.id, now);
  	setTimeout(() => timestamps.delete(message.author.id), cd);
    try {
    	command.execute(message, args);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  //Setup Message Constants
  const mess = message.content.toLowerCase();
  const firstMention = message.mentions.users.first();
  const firstMember = message.mentions.members.first();

  //Restart Command
  if (mess.startsWith(prefix + "restart")) {
    if (member.id != "[Omitted]") return message.channel.send("You don't have permission to use this command!");
    await message.channel.send("Restarting Bot...");
    process.exit();
  }
  if (mess.includes("[Omitted]")) {
    message.channel.send(pingResp[Math.floor(Math.random() * pingResp.length)]);
  } else if (client.responses.hasOwnProperty(mess)) {
    message.channel.send(client.responses[mess].value);
  } else if (picRespObject[mess]) {
    message.channel.send({files:[picRespObject[mess]]});
  } else if (mess.includes("god") || mess.includes("jesus") || mess.includes("christ")) {
    if (client.cfigs["disable_god"].value.toLowerCase() != "true" && !message.author.bot) message.channel.send(godResp[Math.floor(Math.random() * godResp.length)]);
  } else if (mess === "ok" || mess === "okay") {
    if (client.cfigs["disable_ok"].value.toLowerCase() == "true") return;
    message.channel.send("Okay!");
  } else if (mess === "michael") {
    message.react("<:michael:934979342298124348>");
  } else if (mess === "ez") {
    message.react("<:mikEZ:911471618042265680>");
  } else if (mess === "wait") {
    message.react("<:mikeyWait:911471617526358057>");
  } else if (mess === "bruh") {
    message.react("<a:mikeyBruh:934861390680821811>");
  } else if (mess === "yep") {
    message.react("<:mikeyYEP:911471617601843230>");
  }
});
