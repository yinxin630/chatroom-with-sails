/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        nickName: {
            type: 'string',
            size: 16,
            required: true,
        },
        
        socketId: {
            type: 'string',
            required: true,
            unique: true,
        },
    }
};