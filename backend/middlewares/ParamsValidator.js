const { ErrorHandler, handleResponseError } = require('../helpers/error');
const Validator = require('validatorjs');

class Validation{
    constructor(reqType, params){
        this.reqType = reqType;
        this.params = params;
    }
}

const CustomValidator = (validation) => {
    const { reqType, params } = validation;
    return (req, res, next) => {
        let valid = true;
        let reqParams = {};
        
        let statusCode = 400;
        let errorMessage = "Invalid params!";
      

        switch (reqType) {
            case 'post':
                reqParams = req.body;
                break;
            default:
                break;
        }

        let validation = new Validator(reqParams, params);
        valid = validation.passes();


        const error = new ErrorHandler(statusCode, errorMessage, "KO_MISSING_ARGS");
        error.errors = validation.errors.all();


        //END
        if(valid){
            return next();
        }else{
            return handleResponseError(error, res);
        }
    }
}


module.exports = {
    CustomValidator,
    Validation
}