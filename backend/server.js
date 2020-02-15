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
const MongoConnector = require('./connectors/mongo-connector');
const Logger = require('./utils/Logger');
const server = http.Server(app);
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

async function startApp(){
    global.ENV = dotenv.config().parsed;

    /** SERVICE CONFIG */
    const connector = new MongoConnector(global.ENV.MONGO);
    app.db = await connector.createConnection();
    app.logger = new Logger();
    app.logger.active = true;



    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(function (req, res, next) {
        const now = new Date();
        const date = app.logger.color('green')(`${now.getUTCDate()}/${now.getMonth()+1}/${now.getFullYear()}`);
        const METHOD = app.logger.color('cyan')(`${req.method}`)
        const url = app.logger.color('yellow')(req.url);
        console.log(`${date} ${METHOD}${url}`);
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
        .then('modules')
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
            by Leonardo Rivaldo 13/02/2020
            Server running @ ${port}\n\n`
        );
    });
}


startApp();