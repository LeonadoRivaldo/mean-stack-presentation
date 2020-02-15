
const AppMain = require("./AppMain");


/**
 * @interface IArgs
 * @param {modelName}
 * @param {moduleName}
 *
 */





class AppModule extends AppMain{
    model = null;


    /**
     * Creates an instance of AppModule.
     * @param {Express} app
     * @param {IArgs} args
     * @memberof AppModule
     */
    constructor(app, args){
        super(app);

        if(!app.models){
            throw new Error("models is undefined @ AppModule");
        }


        if(!args){
            throw new Error("args is undefined @ AppModule");
        }

        if(!args.modelName){
            throw new Error("modelName is undefined @ AppModule");
        }


        
        if(!app.models[args.modelName]){
            throw new Error(`${args.modelName} is undefined @ app.models`);
        }




        this.model = app.models[args.modelName];
    }



}


module.exports = AppModule;