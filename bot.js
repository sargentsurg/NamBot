var config = {
	channels : ["#chanelName"],
	server : "irc.twitch.tv",
	nick : "NAME OF BOT ON TWITCH ACCOUNT",
	oauthPass : "oauth:GOESHERE"
};

var riotKey = "";

// console.log("server About to start");

// var irc = require("irc");
// var bot = new irc.Client(config.server, config.nick, { channels : config.channels });

// bot.addListener('error', function(message) {
//     console.log('error: ', message);
// });

// bot.addListener('message#namale', function (from, message) {
//     console.log(from + ' => #namale: ' + message);
// });

// // bot.say(config.channels, "I'm a bot!");
// bot.addListener("join",function(channel,who){
// 	bot.say("welcome to the channel" + who)
// });

//requirements
var request = require('request');
var irc = require('twitch-irc');
// var $ = require('jquery');

var namSummonerID = 23688770;
var currentTier = null;
var currentRank = null;
var currentLP = null;

var clientOptions = {
    options: {
        debug: true,
        debugIgnore: ['ping', 'chat', 'action']
    },
    identity: {
        username: 'NamBotz',
        password: 'oauth:OAUTHID'
    },
    channels: ['namale']
}
var client = new irc.client(clientOptions);

client.connect();

client.addListener('chat', function (channel, user, message) {

    // client.say(channel, 'NAM BOT Enabled!');

    console.log(user.username + ': ' + message);

    var lowerCaseMessage = message.toLowerCase()

    if (lowerCaseMessage === '!hello') {
        client.say(channel, 'Hello, ' + user.username + '!');
    }

    if (lowerCaseMessage === '!ahshit') {
        client.say(channel, 'AH shitty!');
    }

    if (lowerCaseMessage === '!rank') {

        request('https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/'+namSummonerID+'?api_key='+riotKey, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var response = JSON.parse(body);
                currentTier = response["RIOTIDGOESHERE"][0]["tier"];

                var objNeeded = response["RIOTIDGOESHERE"][0]["entries"].filter(function(e){
                    return e.playerOrTeamName == "Nam";
                });


                currentRank = objNeeded[0]["division"];
                currentLP = objNeeded[0]["leaguePoints"];

                client.say(channel, 'Nam is: '+currentTier+ " "+ currentRank + " - " + currentLP + " LP");

            }
        });


    }

    if (lowerCaseMessage === '!lolking') {
        client.say(channel, 'Nam\'s lolking:  http://www.lolking.net/summoner/na/23688770');
    }

    if (lowerCaseMessage === '(╯°□°)╯︵ ┻━┻') {
        client.say(channel, '┬─┬﻿ ノ( ゜-゜ノ) We don\'t flip tables here');
    }

    if (lowerCaseMessage === '!banana') {
        client.say(channel, 'ChienPanzee in da house!');
    }

    if (lowerCaseMessage === '!love') {
        client.say(channel, 'Nam doesn\'t love me BibleThump');
    }

    if (lowerCaseMessage === '!seppuku') {
        client.say(channel, 'Let it be known '+user.username+ " is now dead!");
    }


    if (message.indexOf("!8ball") > -1) {
        var eightBallAnswers = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];

        answerPicked = Math.floor((Math.random() * eightBallAnswers.length) + 1);
        client.say(channel, eightBallAnswers[answerPicked]);
    }





});
