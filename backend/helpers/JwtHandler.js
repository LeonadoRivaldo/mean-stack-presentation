const jsonwebtoken = require('jsonwebtoken');

class JwtHandler{

    options = {};

    /**
     *
     *
     * @param {object} payload object with the token content
     * @param {string} secret string with the private key
     * @param {number} [expiresIn = ((60 * 60) * 3)] expiration time in seconds, default tokens expire in  3 hours
     * @param {function} [callback = null]
     * @returns
     * @memberof JwtHandler
     */
    create(payload, secret, expiresIn = ((60 * 60) * 3), callback = null){
        const options = Object.assign({ expiresIn }, this.options);
        return jsonwebtoken.sign(payload, secret, options, callback);
    }

    /**
     *
     *
     * @param {*} token
     * @param {*} secret
     * @param {*} [callback=null]
     * @returns
     * @memberof JwtHandler
     */
    read(token, secret, callback = null){
        return jwt.verify(token, secret, this.options, callback);
    }

}





module.exports = JwtHandler;