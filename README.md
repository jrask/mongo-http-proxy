# MongoDB REST Proxy

Proxy for Sleepy mongoose (Mongodb rest api), https://github.com/10gen-labs/sleepy.mongoose.

**JUST PLAYING, NOT FOR PRODUCTION**


## Features

**Authentication**

Basic-auth support

**Authorization**

ACL - relate users to databases and collections

     {
     	"someUsername":{
     	    "password":"somePassword",
     	    "database":"someDatabase",
     	    "collection":"collection"
     	}
     }
     
     ./bin/mongo-http-proxy -f /etc/acl.json

**CORS (Cross-Origin-Resource-Sharing)**

Makes it simple to access this proxy directly from javascripts without jsonp or creating your own proxy.

**Javascipt API that simplifies usage**

    mongodb.request.get({
        baseUri:'http://localhost:8000',
        database:'demo',
        collection:'demo',
        method:'_find',
        criteria:{name:'johan'},
        sort:{age:mongodb.sort.ASC},
        user:'demo',
        passwd:'demo123',
        error:function (data) {
            alert(JSON.stringify(data))
        },
        success:function (data) {
            $.each(data.results, function (_, value) {
               handleRow(value);
            });
        }
    })

    function handleRow(row) {
        var name = row.name
        var age  = row.age
        console.log(name + ' is ' + age + ' years old' )
    }
    
## Install

    npm pack
    tar xfz mongo-http-proxy-0.0.1.tgz
    mv package mongo-http-proxy
    cd mongo-http-proxy
    npm install

## Start

    ./bin/mongo-http-proxy -H [--help] -p [--proxyPort:num] -h [--targetHost:string] -t [--targetPort:num] -f [--file:path(to acl file)]
    
    This will start the proxy on port 8000 and act as proxy for localhost:27080
    > ./bin/mongo-http-proxy -p 8000 -h localhost - t 27080 -f /path/to/acl.json
    
## TODOs

*Perhaps use other framework for basic auth*

*ACL should of course support multiple databases and collections*

*Fix so that we can use an API token instead of user:pass for each request*

*Easier update of ACL file, perhaps store in database?*

*Learn javascript...*
