// Expected data for Circonscription 111 Delegation 65 Centre 007
var bureaux = {"bureaux":[{"code":"01","name":"قاعة 1"},{"code":"02","name":"قاعة 2"},{"code":"03","name":"قاعة 3"},{"code":"04","name":"قاعة 4"}]};

module.exports.bureaux = bureaux;

module.exports.centre_test_id = "007";
module.exports.deleg_test_id = require("./tnac_deleg.js").deleg_test_id;
module.exports.circ_test_id = require("./tnac_circ.js").circ_test_id;
