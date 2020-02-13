class LoginRouter{
    controller = null;

    constructor(app){
        this.controller = app.controllers.LoginController;
        console.log(this.controller);

        this.POSTRoutes(app);
    }

    POSTRoutes(app){
        //app.post("login", app.controllers);
    }

}




module.exports = (app) => new LoginRouter(app);