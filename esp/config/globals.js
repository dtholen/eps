'use strict';

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/iotdb');

var config =
     {
       demo: {
         server: {
           port: 3001
         },
         mqtt: {
           url: 'mqtt://localhost',
           topics: [ "aods/connect", "aods/evens","aods/service" ],
           sensor: "sensor/#"
         },
         mail_service: {
           host: '127.0.0.1',
           port: '8000',
           securityToken: '318ej382n!?2f'
         }
       },
    showConfig: function(){
          console.log(global.demo);
      }
    };
var globals = {
  'message' : 'Configuration',
  'version':'0.1',
  'db': db,
  evt: ['SYS','CONNECT','TIME','TEMP','BARO','HUM','LDG','DEP','TOD','FUE','PAR','SER','PPR','HCI','HCO','HAN'],
  evt_billable: ['LDG','TOD','FUE','PAR','SER','HAN'],
  ok : {'message': 'OK'},
  nok : {'message': 'Not OK'},
  state: [
   {'_id': 0,  'description': 'created'},
   {'_id': 1,  'description': 'work'},
   {'_id': 2,  'description': 'finished'},
   {'_id': 3,  'description': 'deleted'},
   {'_id': 9,  'description': 'error'} ],
  config : config,

  showConfig: function(){
        console.log(global.message+' Version: '+this.version);
    }
  }

module.exports = globals;
