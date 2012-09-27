# MongoDB REST Proxy

Proxy for Sleepy mongoose (Mongodb rest api), https://github.com/10gen-labs/sleepy.mongoose.


## Features

**Authentication**

Basic-auth support

**Authorization**

ACL - relate users to databases and collections

**CORS (Cross-Origin-Resource-Sharing)**

Makes it simple to access this proxy directly from javascripts without jsonp or creating your own proxy.

**Javascipt API that simplifies usage**


    mongodb.request.get({
        baseUri:'http://localhost:8000',
        database:'demo',
        collection:'demo',
        method:'_find',
        criteria:{name:'johan'},
        sort:{age:-1},
        user:'demo',
        passwd:'demo123'
        },printResult)
    }

    var printResult =  {

       error:function(err) {
          console.log(err);
       },

       success:function(json) {
          $.each(json, function (_, value) {
                handleRow(value);
            });
       }
       
       handleRow:function(row) {
           var name = row.name
           var age  = row.age
           console.log(name + ' is ' + age + ' years old' )
       }
    }

## Install

TODO

## Start

./bin/mongo-http-proxy -H [--help] -p [--proxyPort:num] -h [--targetHost:string] -t [--targetPort:num] -f [--file:path(to acl file)]
