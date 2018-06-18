function runHttpAPI() {

    const http = require("http");    

    http.createServer(function(req, res) {

        const options = 'http://fakerestapi.azurewebsites.net/api/Books';
        
        http.get(options, (reqResult) => {
            let apiResponse = '';

            reqResult.on('data', (chunk) => {
                apiResponse += chunk;
            });

            reqResult.on('end', () => {
                res.write(JSON.stringify(apiResponse));
                res.end();
            });

        });
        
    }).listen(9001);

}

function testServerInformation() {
    const http = require('http');
const options = {
  host: 'www.google.com',
};
const req = http.get(options);
console.log(req);
req.end();
req.once('response', (res) => {
  const ip = req.socket.localAddress;
  const port = req.socket.localPort;
  console.log(`Your IP address is ${ip} and your source port is ${port}.`);
  // consume response object
});
}

function runServerGetAPI() {
    const http = require('http');
    http.createServer(function(req, res) { 

        let apiResData = '';

        const apiReq = http.request('http://fakerestapi.azurewebsites.net/api/Books', (apiRes) => {
            //console.log(`HEADERS: ${JSON.stringify(apiRes.headers)}`);

            apiRes.on('data', (chunk) => {
                apiResData += chunk;
            });

            apiRes.on('end', () => {
                console.log('Response is completed');
                //res.write(apiResData);
            });
        });

        apiReq.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });
        
        console.log(apiResData);

        // write data to request body
        apiReq.write('Hello World');
        apiReq.end();
        
        res.write(apiResData);
        res.end();

    }).listen(9001);
}

exports.runHttpAPI = runHttpAPI;
exports.testServerInformation = testServerInformation;
exports.runServerGetAPI = runServerGetAPI;

