const AppController = require('../helpers/AppController');


class UserController extends AppController{

    constructor(app){
        super(app, { moduleName: 'UserModule' });
    }

    async create(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const result = await this.module.create(name, password, email);
            return res.json(result);
        } catch (error) {
            console.log(error);
            this.handleResponseError(error, res);
        }
    }
}


module.exports = (app)=> new UserController(app);
