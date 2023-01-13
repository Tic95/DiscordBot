
const wait = require('node:timers/promises').setTimeout;
const {login,pass} = require('../.NE_PAS_COPIER/LoginEfrei.json');


const fs = require("node:fs");
const cookiesFilePath = 'cookies.json';
      
const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 200,
    args: ['--hide-scrollbars', '--disable-infobars', '--no-sandbox'],
    viewport: {
      width: 1200,
      height: 800,
    },
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  const previousSession = fs.existsSync(cookiesFilePath);
  if (previousSession) {
    const cookiesString = fs.readFileSync(cookiesFilePath);
    const parsedCookies = JSON.parse(cookiesString);
    if (parsedCookies.length !== 0) {
        await context.addCookies(parsedCookies);
    }
  }

  await page.goto('https://www.myefrei.fr/portal/student/planning');
  await page.type('[id=username]', login);
  await page.type('[id=password]', pass);
  await page.click('button[type=submit]');
  await page.waitForNavigation();
  const cookiesObject = await context.cookies();
  fs.writeFile(cookiesFilePath,JSON.stringify(cookiesObject),
    function (err) {
      if (err) {
        console.log('file could not be written', err);
      }
      console.log('session succsefully saved');
    }
  );
  for (u = 0; u < 13; u++) {
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowDown');
  }
  try {
    await page.click(
      "button[class='sc-hKMtZM eKdPBG MuiButtonBase-root sc-eCYdqJ cQVxYq MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium sc-evZas bpeQPG']"
    );
    await page.waitFor(1000);
    await page.screenshot({ path: 'Planing-Efrei.png' });
    console.log('Planning found !');
    await browser.close();
    await page.waitFor(1000);
    process.exit(0);
  } catch(error){
         console.log(error);
         await page.screenshot({ path: "test.png" });
         const {Client,Events,GatewayIntentBits} = require('discord.js');
         const { token } = require('../.NE_PAS_COPIER/config.json');
         const client = new Client({intents : [GatewayIntentBits.Guilds]});
         client.once(Events.ClientReady,  C => {
         C.user.id = '389078288288579586',
         C.user.send("ERREUR CAPTCHA A REGLER DE SUITE !!!!");
         console.log("erreur CAPTCHA")
         });
         client.login(token);
         await wait(1000);
         process.exit(0);
       }
     

     }
run();
