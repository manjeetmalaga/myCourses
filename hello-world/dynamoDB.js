'use strict';

const aws = require('aws-sdk');
const NAMES_TABLE = process.env.NAMES_TABLE;
const dynamoDBClient = new aws.DynamoDB.DocumentClient(); 

module.exports.saveName = (event, context, callback) => {
    let response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': "*",
        }
    };

    const name = event.queryStringParameters.name;
    const age = event.queryStringParameters.age;
    console.log(`Request to save ${name} with age ${age}`);

    const params = {
        'TableName': NAMES_TABLE,
        'Item': {
            name,
            age
        },
    };

    dynamoDBClient.put(params, (err) => {
        if (err) {
            console.log(err);
            response.statusCode = 400;
            response.body = JSON.stringify({'error': 'Could not save name'});
            callback(null, response);
        }
        response.body = JSON.stringify({name, age});
        callback(null, response);
    });
}

module.exports.getName = (event, context, callback) => {
    let response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    }

    const name = event.queryStringParameters.name;
    console.log(`Request to retrieve ${name}`);

    const params = {
        'TableName': NAMES_TABLE,
        'Key': {
            name
        },
    }

    dynamoDBClient.get(params, (err, result) => {
        if (err) {
            console.log(err);
            response.statusCode = 400;
            response.body = JSON.stringify({'error': 'Could not retrieve name'});
            callback(null, response);
        }
        
        if(result.Item) {
            const {name, age} = result.Item;
            response.statusCode = 200;
            response.body = JSON.stringify({ name, age });
            callback(null, response);
        } else {
            response.statusCode = 400;
            response.body = JSON.stringify({'error': 'Name does not exist'});
            callback(null, response);
        }
    });
}