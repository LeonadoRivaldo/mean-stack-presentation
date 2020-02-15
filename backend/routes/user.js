


class UserRouter{
    controller = null;

    constructor(app){ 
        this.controller = app.controllers.UserController;
        this.POSTRoutes(app);
    }

    POSTRoutes(app){
        this._userCreateRoute(app);
    }

    _userCreateRoute(app){
        const { Validation, CustomValidator } = app.middlewares.ParamsValidator;

        const rules = {
            email:"required|email", 
            name:"required|min:3",
            password:"required|min:6"
        }

        const validate = CustomValidator(new Validation("post", rules));
        app.post("/user/create", validate, (req, res)=> this.controller.create(req, res));
    }

}




module.exports = (app) => new UserRouter(app);