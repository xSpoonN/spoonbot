//Setup Bot Constants
const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const prefix = "~";
const discord_token = "[Omitted]";
client.cfigs = require("./config.json");

client.login(discord_token);
client.on("ready", () => {
  client.user.setActivity('Jamming out',{type:'STREAMING',url:'https://www.twitch.tv/'});
  console.log("Music Initiated.");
  client.user.setStatus('dnd')
});
client.on("message", async message => {

  //Prevents message loops
  if (message.author.bot) return;
});

//Music
client.music = require("discord.js-musicbot-addon");
client.music.start(client, {
  youtubeKey: "[Omitted]",
  anyoneCanSkip: true,
  ownerOverMember: true,
  ownerID: "[Omitted]",
  botPrefix: "~",
  anyoneCanAdjust: true,
  embedColor: 10436608
});
