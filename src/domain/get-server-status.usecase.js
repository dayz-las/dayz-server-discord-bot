const gamedig = require('gamedig');

const DAYZ_HOST = 'dayz.moralesm.cl';
const DAYZ_QUERY_PORT = 27016;
const DAYZ_GAME_TYPE = 'dayz';

module.exports = {
    execute() {
        return gamedig.query({
            host: DAYZ_HOST,
            port: DAYZ_QUERY_PORT,
            type: DAYZ_GAME_TYPE
        }).then(result => new this.DayzServerStatus());
    },
    DayzServerStatus: class {
        
    }
}