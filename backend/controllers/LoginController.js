

class LoginController{

    constructor(_app){

    }

    auth(req, res){
        res.send("auth OK");
    }
}



module.exports = (app)=> new LoginController(app);
