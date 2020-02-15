const AppModule = require('../helpers/AppModule');

class UserModule extends AppModule{
    constructor(app){
        super(app, { modelName: 'UserModel' });
    }
    /**
     *  create user
     *
     * @param {string} name
     * @param {string} password
     * @param {string} email
     * @returns { error, user }
     * @memberof UserModule
     */
    async create(name, password, email){
        try {
            const result =  { error: null, user:null };
            result.user = await this.model.create({ email, password, name });
            return result;
        } catch (error) {
            this._handleError(error, "UserModule.create");
        }
    }



    /**
     *  find user using email and password, main use for auth
     *
     * @param {string} email
     * @param {string} password
     * @returns { error, user }
     * @memberof UserModule
     */
    async findByEmailAndPassword(email, password){
        try {
            const result =  { error: null, user:null };
            result.user = await this.model.findByEmailAndPassword(email, password);
            return result;
        } catch (error) {
            this._handleError(error, "UserModule.findByEmailAndPass");
        }
    }
}

module.exports = (app) => new UserModule(app);