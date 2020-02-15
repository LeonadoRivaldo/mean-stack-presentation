const AppModel = require('../helpers/AppModel');


class UserModel extends AppModel{
    

    constructor(){
        super();
        this.buildSchema();
    }

    /** @override */
    buildSchema(){
        super.buildSchema({
            name: { type: String },
            email: { type: String },
            active: { type: Boolean, default: true },
            password: { type: String }
        });
        this.buildHelpers();
        this.buildIndexes([
            { email:1, password:1 }
        ]);
    }

    buildHelpers(){
        this.schema.statics.findByEmailAndPassword = function(email, password){
            return this.findOne({ email, password });
        }
    }
}



module.exports = function (app) {
    const model = new UserModel();
    return app.db.model('users', model.schema);
}