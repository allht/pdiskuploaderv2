const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');
let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

// bot.on('message', (msg) => {
//   const name = msg.from.first_name;
//   bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(() => {
//       console.log(msg);
//     // reply sent!
//   });
// });

const express = require('express');
// process.env.NTBA_FIX_319 = 1;
// const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

// const port = process.env.PORT || 3001

// const token = '1907182975:AAGW4p9DXySjjezs-9f4JmU80f1zJXsaXG4';
// const bot = new TelegramBot(token, { polling: true });
// const app = express();

bot.on('message', msg => {
    console.log(msg);
  //anything
var hi = "hi";
var bye = "bye";
var start = "/start";
var help = "/help";
if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
bot.sendMessage(msg.chat.id,"Hello dear user");
} 
else if (msg.text.toString().toLowerCase().includes(bye)) {
bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
} 
else if (msg.text.toString().toLowerCase().includes(start)){
    var parsedHtml = "Bot is Working fine..😁😁 \n\nPlease use @asulinkgenbot to convert file to DDL and forward the full message here.📥";
    bot.sendMessage(msg.chat.id, parsedHtml, { parse_mode: 'HTML' });
}
else if (msg.text.toString().toLowerCase().includes(help)){
    var parsedHtml = "1. Send file to @asulinkgenbot.\n2. Forward the message here(Don't Copy Paste)";
    bot.sendMessage(msg.chat.id, parsedHtml, { parse_mode: 'HTML' });
}
    
    //if block to convert link to pdisk
else if(msg.text.toString().toLowerCase().includes('bruh!')){
    if(msg.entities.length === 6){
    if(msg.forward_from.username == "asulinkgenbot"){
        if(msg.chat.id == 852057713){
        //Checking Offset = 1116459663
        //const Offset = msg.entities.length == 1 ? msg.entities[0].offset : msg.entities[5].offset;
        const Offset = 113;
        var movieTitle = msg.text.substring(msg.entities[1].offset,(msg.entities[2].offset-5));
        var fileSize = msg.text.substring(msg.entities[3].offset,(msg.entities[3].offset+msg.entities[3].length));
        var link =  msg.text.substring(msg.entities[5].offset,(msg.entities[5].offset+msg.entities[5].length));
        const url = 'http://pdisk.net/api/ndisk_manager/video/create?link_type=link&content_src='+link+'&source=2000&uid=51081852&title='+movieTitle+' | '+fileSize+'&description=Follow_@moviesnew24_for_more_movies';
        const finallink = encodeURI(url);
        request(finallink, { json: true }, (err, res, body) => 
                    {
                      if (err) { return console.log(err); }
                        var id = body.data.item_id;
                bot.sendMessage(msg.chat.id,movieTitle+': \nhttps://pdisk.net/share-video?videoid='+id, { parse_mode: 'HTML' });
                      //console.log(body.explanation);
         });
        }
        else{
            bot.sendMessage(msg.chat.id,"You are not @Suryaprakash1024");
        }
    }
    }
    else{
        bot.sendMessage(msg.chat.id,"Boss! Forward the link boss");
    }
    }
    //link to pddisk ends here 
else{
    bot.sendMessage(msg.chat.id,"Oops.. Get /help Bruh🤓");
}
});

// app.listen(port,()=>{
//     console.log('Its running')
// })

module.exports = bot;
