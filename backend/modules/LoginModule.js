const AppModule = require('../helpers/AppModule');

class LoginModule extends AppModule{
    constructor(app){
        super(app, { modelName: 'UserModel' });
    }
}


module.exports = (app) => new LoginModule(app);