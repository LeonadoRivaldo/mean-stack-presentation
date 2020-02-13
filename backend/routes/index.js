class IndexRouter{
    constructor(app){
        this.GETRoutes(app);
    }

    GETRoutes(app){
        app.get("/", (req, res)=> res.send("<h1>Welcome to mean stack!</h1>"));
    }

}




module.exports = (app) => new IndexRouter(app);