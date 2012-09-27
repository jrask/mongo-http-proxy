

var http = require('http')

var adminClient = {
    uri:"http://localhost:8000/admin/admin",
    username:"demo",
    password:"demo123",

    getData:function ACL(callback) {
        var options = {
            port: 8000,
            host: 'localhost',
            method: 'GET',
            path: '/demo/demo/_find',
            auth: adminClient.username + ":" + adminClient.password
        };
        var request = http.request(options,
            function (response) {
                console.log('STATUS: ' + response.statusCode);
                console.log('HEADERS: ' + JSON.stringify(response.headers));
                response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                    if(response.statusCode == 200) {
                        callback.handle(JSON.parse(chunk))
                    }

                });
            });
        request.end();

    }
}




var test = {

    handle: function handle(acl) {
        console.log(JSON.stringify(acl))
    }
}

adminClient.getData(test);