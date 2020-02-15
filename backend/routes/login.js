class LoginRouter{
    controller = null;

    constructor(app){
        this.controller = app.controllers.LoginController;
        this.POSTRoutes(app);
    }

    POSTRoutes(app){
        this._authRoute(app);
    }

    _authRoute(app){
        const { Validation, CustomValidator } = app.middlewares.ParamsValidator;

        const rules = {
            email:"required|email", 
            password:"required"
        }

        const validate = CustomValidator(new Validation("post", rules));
        app.post("/auth", validate, (req, res)=> this.controller.auth(req, res));
    }

}




module.exports = (app) => new LoginRouter(app);