const chalk = require('chalk');

class Logger{
    active = false;
    type = 'console';


    color(color){
        return chalk[color];
    }

    log(value){
        if(this.active){
            switch (this.type) {
                case 'file':
                    
                    break;
                default:
                    console.log(value);
                    break;
            }
        }
    }
    
    error(error){
        this.log( chalk.red(error) );
    }

}


module.exports = Logger;