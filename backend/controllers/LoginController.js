const AppController = require('../helpers/AppController');



class LoginController extends AppController {

    constructor(app){
        super(app, {moduleName: "LoginModule" });
        this.userModule = app.modules.UserModule;
    }

    async auth(req, res){
        try {
            const { email, password } = req.body;
            const result = await this.userModule.findByEmailAndPassword(email, password );
            return res.json(result);
        } catch (error) {
            this.handleResponseError(error, res);
        }
    }
}



module.exports = (app)=> new LoginController(app);
