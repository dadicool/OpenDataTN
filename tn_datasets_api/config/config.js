try {
    config_local = require ("./config_local.js");
} catch (err) {
    console.log ("Running against the production API endpoint");
}

var config_prod = {};
config_prod.host = "api.opendatatn.org";
config_prod.port = 80;
config_prod.base_path = "/api";

var config = {};

if (typeof(process.env.LOCAL_RUN) !== 'undefined') {
    config.host = "localhost";
    config.base_path = "/tn_datasets_dev/_design/tn_datasets_api/_rewrite";
    config.port = 5984;
    config.local = true;
} else if (typeof(config_local) === 'undefined') {
    config.base_path = config_prod.base_path;;
    config.host = config_prod.host;
    config.port = config_prod.port;
} else {
    config.base_path = config_local.base_path;;
    config.host = config_local.host;
    config.port = config_local.port;
    config.local = true;
}

module.exports = config;
