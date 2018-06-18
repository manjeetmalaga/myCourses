'use strict';

module.exports.testExtAPICall = (appConfig, event) => {
    return new Promise((resolve, reject) => {
        var https = require('https');

        var optionsGET = {
            'host': 'graph.facebook.com',
            'port': '443',
            'path': '/youscada',
            'method': 'GET',

        };

        var reqGET = https.request(optionsGET, (res) => {
            var fullResponse = '';

            res.on('data', (chunk) => {
                process.stdout.write(chunk);
                fullResponse += chunk;
            });

            // res.on('end', () => {
            //     console.log(fullResponse);
            // });
        })

        reqGET.end();
        reqGET.on('error', (err) => {
            console.error(err);
        });

        /* An access token is required to request this above resource  */

        var postBody = JSON.stringify({
            'message': 'The web of things is approaching, let do some tests to be ready!',
            'name': 'Test message posted with node.js',
            'captions': 'Some Tests with node.js',
            'description': 'This is description',
            'picture': 'http://youscada.com/wp-content/uploads/2012/05/logo2.png',
            'actions': [{
                'name': 'youSCADA',
                'link': 'http://www.youscada.com'
            }]
        });

        var postHeaders = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postBody, 'utf8'),
        };

        var optionsPOST = {
            'host': 'graph.facebook.com',
            'port': '443',
            'path': '/youscada/feed?access_token=your_api_key',
            'method': 'POST',
            'headers': postHeaders,
        };

        var reqPOST = https.request(optionsPOST, (res) => {
            res.on('data', (chunk) => {
                process.stdout.write(chunk);
            })
        });

        reqPOST.write(postBody);
        reqPOST.end();
        reqPOST.on('error', (err) => {
            console.error(err);
        });


    });
}