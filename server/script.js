const http = require('http');

const queries=[
"redapple",
"greentree",
"happydog",
"funnycat",
"bluesky",
"yellowsun",
"coldwater",
"hotfire",
"bighouse"]
// "smallmouse",
// "darknight",
// "brightstar",
// "loudmusic",
// "softpillow",
// "fastcar",
// "slowtrain",
// "youngchild",
// "oldman",
// "whitesnow",
// "blackcoffee",
// "heavyrain",
// "lightfeather",
// "freshair",
// "saltysea",
// "sweetcake",
// "sourlemon",
// "hardrock",
// "softjazz",
// "newshoes",
// "oldbook",
// "emptyglass",
// "fullplate",
// "emptystomach",
// "fullmoon",
// "busystreet",
// "quietpark",
// "emptyroom",
// "fullbackpack",
// "happybirthday",
// "sadsong",
// "strongcoffee",
// "weaktea",
// "funnyjoke",
// "serioustalk",
// "cleanhouse",
// "dirtyclothes",
// "brightday",
// "cloudyweather",
// "warmblanket",
// "coolbreeze",
// "loudthunder",
// "silentnight",
// "bigcity",
// "smalltown",
// "wideroad",
// "narrowalley",
// "smoothsurface",
// "roughstone",
// "strongwind",
// "gentletouch",
// "fastinternet",
// "slowconnection",
// "bigscreen",
// "smallphone",
// "hardwork",
// "easyjob",
// "darkchocolate",
// "milktea",
// "happyfamily",
// "lonelyperson",
// "hotpizza",
// "colddrink",
// "sweethoney",
// "bittertaste",
// "sadmovie",
// "funnyvideo",
// "freshfruit",
// "rottenegg",
// "greengrass",
// "browndirt",
// "brightcolor",
// "dullgray",
// "hotshower",
// "coldwind",
// "thickbook",
// "thinpaper",
// "emptywallet",
// "fullbank",
// "emptyglass",
// "fullplate",
// "emptystomach",
// "fullmoon",
// "bigdog",
// "smallcat",
// "happyface",
// "sadexpression",
// "bigbird",
// "smallinsect",
// "brightidea",
// "dullmoment",
// "hardmetal",
// "softfabric",
// "loudnoise",
// "quietlibrary",
// "strongmuscle",
// "weakpoint",
// "coldwinter",
// "hotsummer",
// "brightlight",
// "darkshadow",
// "happymemory",
// "sadexperience",
// "freshair",
// "stalebread",
// "fastrunner",
// "slowwalker",
// "bigheart",
// "smallmind",
// "hardstone",
// "softclay",
// "loudvoice",
// "quietwhisper",
// "strongsmell",
// "weaktaste",
// "cleanroom",
// "dirtyhands",
// "bigsmile",
// "smalltalk",
// "widesmile",
// "narrowmind"];




    async function runQueries() {
        for (let i = 0; i < 100; i++) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          for (const query of queries) {
            query.replace(" ","+");
            const options = {
              method: 'GET',
              hostname: 'localhost',
              port: 4000,
              path: `/deposit/${query}`,
            };
      
            const req = http.request(options, (res) => {
              console.log(`statusCode: ${res.statusCode}`);
      
              res.on('data', (d) => {
                process.stdout.write(d);
              });
            });
      
            req.on('error', (error) => {
              console.error(error);
            });
      
            req.end();
      
            // introduce a delay of 500ms before starting the next iteration
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
      
      runQueries();
