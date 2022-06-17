require("dotenv").config()
const axios = require("axios");
const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.SEARCH_TOKEN);
const express = require("express");
const app = express();
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    res.write('<html><style>h3 {text-align: center;}</style><h3>HelperBot is up and running!</h3></html>');

    var result=''
client.on("message", msg => {
  
  var splitted=msg.content.split(' ')
  if (splitted[0] === "hb") {
    try{
      if(splitted[1] === "help"){
        msg.reply("You have called for help!\n✈️ For searching a place- `hb loc <yoursearch>`\n\n📹 For searching any media- `hb play <yoursearch>`\n\n🎵 For searching a song- `hb song <yoursong>`\n\n🍔 For searching food recipe - `hb food <yoursearch>`\n\n🌦️ For weather- `hb weather <yourplace>`\n\n❔ For word meaning- `hb dict <yourword>`\n\n❓ For urban dictionary meaning- `hb urbandict <yourword>`\n\n💰 To convert currencies- `hb currency <your-currency-value> <your-currency-code> <desired-currency-code>`\n\n🛒 For shopping item- `hb buy <youritem>`\n\n💊 For medication details- `hb med <yourmed>`\n\n🖼️ To reverse search an image URL- `hb isearch <yourimageurl>`\n")

      }
      else if(splitted[1]==="loc"){
        result = result.concat("where is ")

        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
       try {
            console.log(data["knowledge_graph"]["local_map"]["link"]);
            msg.reply('Your place can be found here: '+data["knowledge_graph"]["local_map"]["link"])
            result=''
        }
        catch(TypeError){
          try{
            console.log(data["local_map"]['link']);
        msg.reply('Your place can be found here: '+data["local_map"]['link'])
        result=''
          }
          catch(err){
            msg.reply('Your place can be found here: '+data["organic_results"][0].link)
            result=''
          }
            
        }
        
        
      };
      search.json(params, callback);
      }
      else if(splitted[1]==="play"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const options = {
        method: 'GET',
        url: 'https://simple-youtube-search.p.rapidapi.com/search',
        params: {query: result, type: 'video', safesearch: 'false'},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_KEY_TOKEN,
          'X-RapidAPI-Host': 'simple-youtube-search.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        msg.reply('Have fun! '+response.data['results'][0]['url']);
        result=''
      }).catch(function (error) {
        console.error(error);
        result=''
      });
      
    
      }
      else if(splitted[1]==="song"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {q: result, type: 'tracks', offset: '0', limit: '1', numberOfTopResults: '1'},
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_KEY_TOKEN,
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        msg.reply('Have fun! '+'https://open.spotify.com/track/'+response.data['tracks']['items'][0]['data']['id']);
        result=''
      }).catch(function (error) {
        console.error(error);
        result=''
      });
      }
      else if(splitted[1]==="med"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
            result = result.concat("medication details")
            
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        
          console.log(data["organic_results"][0].link);
          msg.reply('Here are the details about the medicine: '+data["organic_results"][0].link)
          result=''
        
        
        
      };
      search.json(params, callback);
      }

      else if(splitted[1]==="urbandict"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
            
      }

          const options = {
            method: 'GET',
            url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
            params: {term: result},
            headers: {
              'X-RapidAPI-Key': process.env.RAPID_KEY_TOKEN,
              'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
            }
          };

          axios.request(options).then(function (response) {
            msg.reply('Your word officially/unofficially means..'+response.data["list"][0]["definition"])
            result=''
          }).catch(function (error) {
            console.error(error);
            msg.reply('Thats a weird word')
            result=''
          });
      }
      else if(splitted[1]==="dict"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
            result = result.concat("meaning")
      }

      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        try{
          if(data["answer_box"]["definition"]===undefined) throw TypeError;
          else{
            msg.reply('Here is meaning: '+data["answer_box"]["definitions"])
            result=''
          }
        
        }
        catch(TypeError){
          console.log(data["organic_results"][0]);
          msg.reply('You can refer this link: '+data["organic_results"][0]['link'])
          result=''
        }
      };
      search.json(params, callback);
      }


      else if(splitted[1]==="buy"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
            result = result.concat("amazon")
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        try{
        console.log(data["shopping_results"][0].link);
        msg.reply('Here is the item you are looking for: '+data["shopping_results"][0].link)
        result=''
        }
        catch(TypeError){
          console.log(data["organic_results"][0].link);
          msg.reply('Here is the item you are looking for: '+data["organic_results"][0].link)
          result=''
        }
      };
      search.json(params, callback);
      }
      else if(splitted[1]==="food"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        try{
          console.log(data["recipes_results"][0].link);
          msg.reply('Here is the recipe! '+data["recipes_results"][0].link)
          result=''
        }
        
        catch(TypeError){
          console.log(data["organic_results"][0].link);
          msg.reply('Here is the recipe! '+data["organic_results"][0].link)
          result=''
        }
      };
      search.json(params, callback);
      }
      else if(splitted[1]==="weather"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
            result = result.concat("weather")
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        try{
          console.log(((parseInt(data["answer_box"]["temperature"]- 32)) * 5/9).toFixed(2).toString()+'°C\n'+"Forecast: "+data["answer_box"]["forecast"][0]["weather"]);
          var a = (parseInt(data["answer_box"]["temperature"]- 32) * 5/9).toFixed(2).toString()
          msg.reply("Temperature: "+a+'°C\n'+"Might expect: "+data["answer_box"]["forecast"][0]["weather"]+"\n")
         
          result=''
        }
        
        catch(TypeError){
          console.log(data["organic_results"][0].link);
          msg.reply('Your search:'+data["organic_results"][0].link)
          result=''
        }
      };
      search.json(params, callback);
      }
      else if(splitted[1]==="search"){
        for (let i = 2; i < splitted.length; i++) {
            result = result.concat(splitted[i]+' ');
      }
      const params = {
        engine: "google",
        q: result
      };
      const callback = function(data) {
        console.log(data["organic_results"][0].link);
        msg.reply('Your search:'+data["organic_results"][0].link)
        result=''
      };
      search.json(params, callback);
      }
      else if(splitted[1]==="isearch"){
        result=splitted[2]
      const params = {
        engine: "google_reverse_image",
        image_url: result
      };
      
      const callback = function(data) {
        console.log(data["inline_images"][0]["source"]);
        msg.reply('The image is found from this link:'+data["inline_images"][0]["source"])
      };
      
      // Show result as JSON
      search.json(params, callback);
      }
      else if(splitted[1]==="currency"){
        var from=splitted[3].toUpperCase();
        var to=splitted[4].toUpperCase();
        var val=splitted[2]
        const encodedParams = new URLSearchParams();
        encodedParams.append("from-value", val);
        encodedParams.append("from-type", from);
        encodedParams.append("to-type", to);
        
        const options = {
          method: 'POST',
          url: 'https://community-neutrino-currency-conversion.p.rapidapi.com/convert',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': process.env.RAPID_KEY_TOKEN,
            'X-RapidAPI-Host': 'community-neutrino-currency-conversion.p.rapidapi.com'
          },
          data: encodedParams
        };
        
        axios.request(options).then(function (response) {
          console.log(response.data);
          var res=parseFloat(response.data["result"]).toFixed(2)
          msg.reply(val+' '+from+' is: '+res+' '+to)
          res=''
          from=''
          to=''

        }).catch(function (error) {
          console.error(error);
          msg.reply('Invalid command')
          res=''
          from=''
          to=''
        });
      }
    else  msg.reply("Please use `hb help` for the correct commands")

    console.log(result)
      
    }
    catch(err){
      for (let i = 1; i < splitted.length; i++) {
        result = result.concat(splitted[i]+' ');
  }
  const params = {
    engine: "google",
    q: result
  };
  const callback = function(data) {
    console.log(data["organic_results"][0].link);
    msg.reply('Your search '+data["organic_results"][0].link)
    result=''
  };
  search.json(params, callback);

    }
    }
    
})

client.login(process.env.BOT_TOKEN)
module.exports = client
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
