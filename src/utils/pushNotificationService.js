const { ONE_SIGNAL_CONFIG } = require("../config/oneSignalConfig");

const optionsBuilder = (method, path, body) => {

    let headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + ONE_SIGNAL_CONFIG.API_KEY,
    };

    return {
        method,
        'url': ONE_SIGNAL_CONFIG.BASE_URL+path,
        'headers': headers,
        body: body ? JSON.stringify(body) : null
    };
}

module.exports = {optionsBuilder}

/*
async function sendNotification(data,callback) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + ONE_SIGNAL_CONFIG.API_KEY,
    };

    var option = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    var https = require("https");
    var req = https.request(option,function (res){
        res.on("data",function (data){
            console.log(JSON.parse(data))

            return callback(null, JSON.parse(data))
        });
    });

    req.on("error",function (e){
        return callback({
            message: e
        });
    });

    req.write(JSON.stringify(data));
    req.end();

}

module.exports = {
    sendNotification
}*/