# MongoDB REST Proxy

Proxy for Sleepy mongoose (Mongodb rest api), https://github.com/10gen-labs/sleepy.mongoose.


## Features

**Authentication**

Basic-auth support

**Authorization**

ACL - relate users to databases and collections

**CORS (Cross-Origin-Resource-Sharing)**

Makes it simple to access this proxy directly from javascripts without jsonp or creating your own proxy.

## Install

TODO

## Start

./bin/mongo-http-proxy -H [--help] -p [--proxyPort:num] -h [--targetHost:string] -t [--targetPort:num] -f [--file:path(to acl file)]
