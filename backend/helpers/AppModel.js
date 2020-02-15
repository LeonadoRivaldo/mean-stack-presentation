const Schema = require('mongoose').Schema;



class AppModel{
    schema;

    buildSchema(schemaObj){
        if(!this.schema){
            this.schema = new Schema(schemaObj);    
        }
        return this.schema;
    }

    buildIndexes(indexes){
        if(!Array.isArray(indexes)){
            throw "indexes must be and array @ AppModel";
        }

        indexes.forEach((index) => this.schema.index(index) );

    }
}


module.exports = AppModel