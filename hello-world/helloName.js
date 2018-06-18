'use strict';

module.exports.helloName = (event, context, callback) => {
    let name = 'stranger';
    if(event.queryStringParameters && event.queryStringParameters.name) {
      name = event.queryStringParameters.name;
    };
  
    const response = {
      'statusCode': 200,
      'headers': {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      'body': JSON.stringify({
        'message': `Hello ${name}!`,
        'input': event,
      }),
    };
  
    callback(null, response);
  }