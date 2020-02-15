const { ErrorHandler } = require('./ErrorHandlers');


class AppMain{
    logger = console.log;
    constructor(app){
        if(!app){
            throw new Error("app is undefined @ AppMain");
        }
        this.logger = app.logger;
    }


    _handleError(error, methodName = '_handleError' ){
        const type = error.type || error.code;
        const message = error.message || undefined;
        const statusCode = error.statusCode || undefined;
        const newError = new ErrorHandler(statusCode, message, type);
        this.logger.error(`Error @ ${methodName} ${message}`);
        this.logger.error(error.stack);
        throw newError
    }

}


module.exports = AppMain;