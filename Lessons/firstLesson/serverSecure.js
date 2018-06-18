function runHttpsAPI() {
    const https = require('https');

    var techWorksAPI = 'https://c6ngor8tmk.execute-api.us-east-1.amazonaws.com/dev/search?mdn=8100015553';

    const serverOptions = '';
    https.createServer(serverOptions, function(req, res) {

        const addlOptions = {
            'url': 'https://c6ngor8tmk.execute-api.us-east-1.amazonaws.com/dev/search?mdn=8100015553',
        };  

        https.get(addlOptions, (reqResult) => {
            var agreementData = '';

            reqResult.on('data', (chunk) => {
                agreementData += chunk;
            });

            reqResult.on('end', () => {
                const jSONAgreementData = JSON.parse(agreementData);                
                res.write(JSON.stringify(jSONAgreementData));
                res.end();
            });
        });    
    }).listen(9002);
}

exports.runHttpsAPI = runHttpsAPI;