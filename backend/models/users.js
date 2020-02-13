const Schema = require('mongoose').Schema;
const crypto = require('crypto');

function crypPass(value){
 return crypto.createHmac('sha256', process.env.SECRET)
 .update(value)
 .digest('hex');
}



class UserModel{
    userSchema;

    constructor(){
        this.buildSchema();
    }

    buildSchema(){
        if(!this.userSchema){
            this.userSchema = new Schema({
                name: { type: String, required: 'Informe o nome do usuário' },
                email: { type: String },
                active: { type: Boolean, default: true },
                password: { type: String, get: crypPass  }
            });    
        }


        //this.createIndexes();

        return this.userSchema;
    }
}



module.exports = function (app) {
    const model = new UserModel();
    return app.db.model('users', model.userSchema);
}