const {SlashCommandBuilder} = require("discord.js");
module.exports = {
        data: new SlashCommandBuilder()
        .setName("salles_libres")
        .setDescription("trouve une salle libre en fonction de la date et les horaires indiquer")
        .addStringOption((option)=>
              option
                .setName("mois")
                .setDescription("Indique le Mois")
                .setRequired(true)
                .addChoices(
                { name:"janvier", value: "2023-01-"},
                { name:"fevrier", value: "2023-02-"} ,
                { name:"mars", value: "2023-03-"} ,
                { name:"avril", value: "2023-04-"},
                { name:"mai", value: "2023-05-"},
                { name:"juin", value: "2023-06-"},
                { name:"juillet", value: "2023-07-"},
                { name:"aout", value: "2023-08-"},
                { name:"septembre", value: "2023-09-"},
                { name:"octobre", value: "2023-10-"},
                { name:"novembre", value: "2023-11-"},
                { name:"decembre", value: "2023-12-"},
              ))
        .addStringOption(option =>
                option
                    .setName('jour')
                    .setRequired(true)
                    .setDescription('Indique le jour')
                )
        .addStringOption((option)=>
              option
                .setName("heure_de_debut")
                .setDescription("Indique l'heure de debut")
                .setRequired(true)
                .addChoices(
                { name:"08h00", value: "08h00"},
                { name:"08h30", value: "08h30"} ,
                { name:"09h00", value: "09h00"} ,
                { name:"09h30", value: "09h30"},
                { name:"10h00", value: "10h00"},
                { name:"10h30", value: "10h30"},
                { name:"11h00", value: "11h00"},
                { name:"11h30", value: "11h30"},
                { name:"12h00", value: "12h00"},
                { name:"12h30", value: "12h30"},
                { name:"13h00", value: "13h00"},
                { name:"13h30", value: "13h30"},
                { name:"14h00", value: "14h00"},
                { name:"14h30", value: "14h30"},
                { name:"15h00", value: "15h00"},
                { name:"15h30", value: "15h30"},
                { name:"16h00", value: "16h00"},
                { name:"16h30", value: "16h30"},
                { name:"17h00", value: "17h00"},
                { name:"17h30", value: "17h30"},
                { name:"18h00", value: "18h00"},
                { name:"18h30", value: "18h30"},
                { name:"19h00", value: "19h00"},
                { name:"19h30", value: "19h30"},
                { name:"20h00", value: "20h00"},
              ))

      .addStringOption((option)=>
            option
                .setName("heure_de_fin")
                .setDescription("Indique l'heure de fin")
                .setRequired(true)
                .addChoices(
                { name:"08h00", value: "08h00"},
                { name:"08h30", value: "08h30"} ,
                { name:"09h00", value: "09h00"} ,
                { name:"09h30", value: "09h30"},
                { name:"10h00", value: "10h00"},
                { name:"10h30", value: "10h30"},
                { name:"11h00", value: "11h00"},
                { name:"11h30", value: "11h30"},
                { name:"12h00", value: "12h00"},
                { name:"12h30", value: "12h30"},
                { name:"13h00", value: "13h00"},
                { name:"13h30", value: "13h30"},
                { name:"14h00", value: "14h00"},
                { name:"14h30", value: "14h30"},
                { name:"15h00", value: "15h00"},
                { name:"15h30", value: "15h30"},
                { name:"16h00", value: "16h00"},
                { name:"16h30", value: "16h30"},
                { name:"17h00", value: "17h00"},
                { name:"17h30", value: "17h30"},
                { name:"18h00", value: "18h00"},
                { name:"18h30", value: "18h30"},
                { name:"19h00", value: "19h00"},
                { name:"19h30", value: "19h30"},
                { name:"20h00", value: "20h00"},
          )),


async execute(interaction){
console.log(interaction.options.getString("mois"),interaction.options.getString("jour"));
var jour = parseInt(interaction.options.getString("jour"));
if (jour >30 || jour  < 1){
await interaction.reply({content :"le jour est mauvais....."   });
}else{
await interaction.reply({content :"Calcul en cours...   (peut prendre du temps)"});

const wait = require('node:timers/promises').setTimeout;
const {login,pass} = require('../.NE_PAS_COPIER/LoginEfrei.json');
const { executablePath } = require( 'puppeteer');
const puppeteer = require( 'puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require("node:fs");
const cookiesFilePath = './cookies.json';

puppeteer.use(StealthPlugin())
      puppeteer
        .launch({
          userDataDir: './myUserDataDir',
        headless: true,
        slowMo: 250,
        args: [ '--hide-scrollbars' ,'--disable-infobars', '--no-sandbox','--disable-setuid-sandbox'],
        executablePath: '/usr/bin/chromium-browser',
        env :{ DISPLAY:":0"},
        defaultViewport: {
         width: 1200,
         height: 800,

        }
        })
      .then(async (browser) => {
       var jour = parseInt(interaction.options.getString("jour"));
        if (jour <11){
        jour = "0"+ jour;
        }
        jour = jour.toString();
        const page = await browser.newPage();
       const previousSession = fs.existsSync(cookiesFilePath);
        if(previousSession){
          const cookiesString = fs.readFileSync(cookiesFilePath);
          const parsedCookies = JSON.parse(cookiesString);
          if(parsedCookies.length !== 0){
            for(let cookie of parsedCookies){
              await page.setCookie(cookie)
            }
          }
        }

        await page.goto(`https://www.myefrei.fr/api/extranet/queries/free-rooms?date=${interaction.options.getString("mois")}${jour}`);
        await wait(500);
        console.log(page.url());
        if (page.url() == "https://www.myefrei.fr/portal?session=expired"){
                await page.click("button[class='sc-hKMtZM eKdPBG MuiButtonBase-root sc-eCYdqJ cQVxYq MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium sc-cxabCf gjjwZH'");
        await wait(500);
        console.log(page.url());
        try{
                await page.type('input[id=username]',login);
                await page.type('input[id=password]',pass);
                await page.click('button[type=submit]');
        }catch(error){
             console.log(error);
           }
        await wait(2500);
        const cookiesObject = await page.cookies();
        fs.writeFile(cookiesFilePath,JSON.stringify(cookiesObject),
        function(err){
          if(err){
            console.log("file could not be written",err);
          }
            console.log("session succsefully saved")
          })
        console.log(page.url());
        request = await page.evaluate(() => {
         return document.getElementsByTagName("pre")[0].innerHTML;
        });

var Horaire = ["08h00","08h30","09h00","09h30","10h00","10h30","11h00","11h30","12h00","12h30","13h00","13h30","14h00","14h30","15h00","15h30","16h00",>var heure_debut, heure_fin, jour, request;
heure_debut = interaction.options.getString("heure_de_debut");
heure_fin = interaction.options.getString("heure_de_fin");
var ListDict=[], ListSalles = [];
var Hend = Horaire.indexOf(heure_fin);
var FormatedRequest = request.slice(10, (- 3)).split("},{");
for(let i =0 ;i < FormatedRequest.length ;i++){
   FormatedRequest[i] = "{"+FormatedRequest[i]+"}";
}
for(let i =0;i < FormatedRequest.length;i++){
   var Dict = JSON.parse(FormatedRequest[i]);
   if(Dict.st == heure_debut ){
        var IdHd = Horaire.indexOf(heure_debut);
        for(let j =i;j < (FormatedRequest.length - i);j++){
             verif =  JSON.parse(FormatedRequest[j]);
             if (verif.st == Horaire[IdHd+1]&& verif.rn == Dict.rn){
                IdHd += 1;
                if (IdHd>= Hend){
                ListSalles.push(verif.rn);
                break
             }
             }
        }
   }
}
browser.disconnect();
console.log(ListSalles);
await interaction.followUp({content :`Liste des Salles : \n ${ListSalles}`});
await wait(25000)
});}
}}
