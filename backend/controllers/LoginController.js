const AppController = require('../helpers/AppController');
const JwtHandler = require('../helpers/JwtHandler');


class LoginController extends AppController {

    constructor(app){
        super(app, {moduleName: "LoginModule" });
        this.userModule = app.modules.UserModule;
    }

    async auth(req, res){
        try {
            
            //deps
            const jwt = new JwtHandler();
            let token = null;
            //user authentication
            const { email, password } = req.body;
            const result = await this.userModule.findByEmailAndPassword(email, password );
            const { user } = result;
            const payload = {
                uid: user._id
            };


            //bluid token
            try {
                token = jwt.create(payload, process.env.SECRET);
            } catch (error) {
                this._handleError(error, 'logincontroler.auth');
            }

            //RESPONSE
            result.message = `Welcome, ${user.name}!`;
            result.user = { _id: user._id, name: user.name, email: user.email };
            result.token = token;
            return res.json(result);


        } catch (error) {
            this.handleResponseError(error, res);
        }
    }
}



module.exports = (app)=> new LoginController(app);
