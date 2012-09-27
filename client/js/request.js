var mongodb = {
    sort: {
        ASC  : 0,
        DESC :-1
    }
}



mongodb.request = {
    get:function (options, callback) {
        $.ajax({
            type:"GET",
            url:mongodb.request.makeUrl(options),
            dataType:"json",
            headers:{"Authorization":make_base_auth(options.user, options.passwd)}, // Should be supplied by login
            cache:false,
            error:options.error,
            success:options.success
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
        return url;
    },

    makeauth:function make_base_auth(user, password) {
        var tok = user + ':' + password;
        var hash = base64.encode(tok);
        return "Basic " + hash;
    },



}
