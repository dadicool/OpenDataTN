try {
    config_local = require ("./config_local.js");
} catch (err) {
    console.log ("Running against the production API endpoint");
}

var config_prod = {};
config_prod.host = "api.opendatatn.org";
config_prod.port = 80;

var config = {};

if (typeof config_local === 'undefined') {
    config.host = config_prod.host;
    config.port = config_prod.port;
} else {
    config.host = config_local.host;
    config.port = config_local.port;
}

module.exports = config;
