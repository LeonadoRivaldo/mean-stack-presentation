const mongoose = require('mongoose');

const defaultDbConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

/**
 * 
 *
 * @class MongoConnector
 */
class MongoConnector{
    dbConnection = null;
    dbConnectionString = null;
    dbConnectOptions = null

    /**
     * Creates an instance of MongoConnector.
     * 
     * options{props}
     *      <useNewUrlParser>
     *      <useCreateIndex>
     *      <useFindAndModify>
     *      <useUnifiedTopology>
     *      <promiseLibrary>
     *      <poolSize>
     *      <connectTimeoutMS>
     *      <socketTimeoutMS>
     *      <family>
     *      <authSource >
     * 
     * 
     * @param {*} connectionString
     * @param { } [options=null]
     * @memberof MongoConnector
     */
    constructor( dbConnectionString, options = {} ){
        this.dbConnectionString = dbConnectionString;
        this.dbConnectOptions  = Object.assign(defaultDbConnectOptions, options);
    }

    createConnection(){
        try {
            if(!this.dbConnection){
                const connectionString = this.checkConnectionString();
                this.dbConnection = mongoose.connect(connectionString, this.dbConnectOptions);
            }
            return this.dbConnection;
        } catch (error) {
            console.error("createConnection", error);
        }
    }

    async getConnection(){
        return await this.dbConnection; 
    }

    checkConnectionString(){
        if(!this.dbConnectionString){
            throw "dbConnectionString@MongoConnector is undefined or null";
        }else{
            return this.dbConnectionString;
        }

    }


    handleConnectionError(error){
        console.error("handleConnectionError", error);
        throw '\n\nMongo db is not connected!';
    }

}



module.exports = MongoConnector;
