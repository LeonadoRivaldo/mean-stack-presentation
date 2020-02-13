/*
___  ___                       _             _    
|  \\/  |                      | |           | |   
| .  . | ___  __ _ _ __    ___| |_ __ _  ___| | __
| |\\/| |/ _ \\/ _` | '_ \\  / __| __/ _` |/ __| |/ /
| |  | |  __/ (_| | | | | \\__ \\ || (_| | (__|   < 
\\_|  |_/\\___|\\__,_|_| |_| |___/\\__\\__,_|\\___|_|\\_\\
                                                  
  
by Leonardo Rivaldo 13/02/2020
*/


/**
 * modules 
 */


const app = require('express')();
const http = require('http');
const dotenv = require('dotenv');
const consign = require('consign');
const MongoConnector = require('./modules/mongo-connector');
const server = http.Server(app);

async function startApp(){
    global.ENV = dotenv.config().parsed;

    /** SERVICE CONFIG */
    const connector = new MongoConnector(global.ENV.MONGO);
    app.db = await connector.createConnection();


    app.use(function (req, res, next) {
        console.log(new Date() + " " + req.method + " " + req.url);
        next();
    });

    const consigOptions = {
        logger: console,
        verbose: true,
        loggingType: 'info'
    };
    consign(consigOptions)
        .include('models')
        .then('middlewares')
        .then('controllers')
        .then('routes')
        .into(app);


    const port = parseInt(global.ENV.PORT, 10);
    server.listen(port, ()=>{
        console.log(`
    ___  ___                       _             _    
    |  \\/  |                      | |           | |   
    | .  . | ___  __ _ _ __    ___| |_ __ _  ___| | __
    | |\\/| |/ _ \\/ _\` | '_ \\  / __| __/ _\` |/ __| |/ /
    | |  | |  __/ (_| | | | | \\__ \\ || (_| | (__|   < 
    \\_|  |_/\\___|\\__,_|_| |_| |___/\\__\\__,_|\\___|_|\\_\\
    by Leonardo Rivaldo 13/02/2020`
    );
        console.log(`Server running @ ${port}`);
    });
}


startApp();