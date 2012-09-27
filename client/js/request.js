var mongodb = {};

mongodb.request = {

    get:function (options, callback) {
        console.log(options)
        $.ajax({
            type:"GET",
            url:makeUrl(options),
            dataType:"json",
            headers:{"Authorization":make_base_auth(options.user, options.passwd)}, // Should be supplied by login
            cache:false,
            error:function (data) {
                callback.error(data);
            },
            success:function (data) {
                callback.success(data);
            }
        })
    },


    makeUrl:function makeUrl(options) {
        var url = options.baseUri + "/" + options.database + "/" + options.collection + "/" + options.method;

        if (options.criteria || options.sort) {
            url = url + "?"
        }
        if (options.criteria) {
            url = url + "criteria=" + JSON.stringify(options.criteria);
            if (options.sort) {
                url = url + "&";
            }
        }
        if (options.sort) {
            url = url + "sort=" + JSON.stringify(options.sort);
        }
        console.log(url)
        return url;
    },

    makeauth:function make_base_auth(user, password) {
        var tok = user + ':' + password;
        var hash = base64.encode(tok);
        return "Basic " + hash;
    }

}
