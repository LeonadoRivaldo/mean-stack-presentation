const AppMain = require("./AppMain");
const {handleResponseError} = require('../helpers/error');



class AppController extends AppMain{
    module = null;
    handleResponseError = handleResponseError;

    /**
     * Creates an instance of AppController.
     * @param {*} app
     * @param {*} args
     * @memberof AppController
     */
    constructor(app, args){
        super(app);

        if(!args){
            throw new Error("args is undefined @ AppController");
        }

        if(!args.moduleName){
            throw new Error("moduleName is undefined @ AppController");
        }

        if(!app.modules){
            throw new Error("modules is undefined @ AppController");
        }
        if(!app.modules[args.moduleName]){
            throw new Error(`${args.moduleName} is undefined @ app.modules`);
        }


        this.module = app.modules[args.moduleName];
    }

}



module.exports = AppController;