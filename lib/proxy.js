var http = require('http'),
    httpProxy = require('http-proxy');
var fs = require('fs')


var targetHost = 'localhost'
var targetPort = 27080;
var proxyPort = 8000;

// Access control list, read from file on startup
// TODO: add fs.watch()

var acl = {

    // default acl if no file is provided
    acl:{
        demo:{
            password:'demo123',
            database:'demo',
            collection:'demo'
        }
    },

    read:function() {

        if(!acl.file) {
            return;
        }
        console.log("reading file: " + acl.file)
        fs.readFile(acl.file, function (err, data) {
            if (data) {
                acl.acl = JSON.parse(data)
                console.log(JSON.stringify(acl.acl))
            } else {
                console.log(err)
            }
        });
    }
}


//
// Proxy for MongoDB REST Service
//
var server = httpProxy.createServer(function (req, res, proxy) {

    handleCors(req, res, {
        onContinue:function () {
            authenticate(req, res, {
                onSuccess:function () {
                    proxy.proxyRequest(req, res, {
                        host:targetHost,
                        port:targetPort
                    });
                },
                onError:function () {
                    console.log("authentication failed")
                }
            })
        },
        onOptions:function () {
            //console.log("Handled OPTIONS request")
        }
    })
})
if (!module.parent) {
    server.listen(proxyPort);
}


// Cross-origin-resource sharing between two ports to support the javascript accessing
// the proxy
function handleCors(req, res, callback) {

    // Use ip or domain name when in production, * for all is useful for running locally
    // res.setHeader('Access-Control-Allow-Origin','http://54.243.217.98:8001')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');

    // CORS OPTIONS request, simply return 200
    if (req.method == 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        callback.onOptions();
        return;
    }

    callback.onContinue();
}

// Basic-auth validation and url (database) access validation
function authenticate(req, res, callback) {

    // Extract authorization header and decode
    var header = req.headers['authorization'] || '', // get the header
        token = header.split(/\s+/).pop() || '', // and the encoded auth token
        auth = new Buffer(token, 'base64').toString(), // convert from base64
        parts = auth.split(/:/), // split on colon
        user = parts[0],
        passwd = parts[1];

    // Validate the user and password
    var userAcl = acl.acl[user];
    if (!userAcl || userAcl.password != passwd) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm=\"quiz.jayway.com\"');
        console.log("Invalid user: " + user + " or password: " + passwd)
        res.write('Invalid credentials');
        res.end();
        callback.onError()
        return
    }

    // Validate that the user has access to the database
    if (!req.url.match(new RegExp('/' + userAcl.database + '/' + userAcl.collection + '/'))) {
        res.statusCode = 401;
        res.write("You do not have access to this database")
        res.end();
        callback.onError();
        return;

    }
    callback.onSuccess();


}


var proxy = {

    start:function start(aProxyPort, aTargetHost, aTargetPort,aclFile) {
        targetHost = aTargetHost
        targetPort = aTargetPort
        proxyPort = aProxyPort

        if(aclFile) {
            acl.file = aclFile;
        }

        acl.read()
        //setInterval(read, 5000)   //TODO
        server.listen(proxyPort)
    }
}

module.exports = proxy
