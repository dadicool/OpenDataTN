var vows = require('vows');
var assert = require('assert');
var APIeasy = require('api-easy');
var config = require('./config.js');
var expectedData = require('./fixtures/tnac_aggreg_centre.js');
var expectedResultCentre = expectedData.resultCentre;
var expectedResultDelegation = expectedData.resultDelegation;
var expectedResultCirconscription = expectedData.resultCirconscription;
var centre_test_id = expectedData.centre_test_id; 
var deleg_test_id = expectedData.deleg_test_id; 
var circ_test_id = expectedData.circ_test_id; 

var fn_utils = require('./lib/tnac_test_utils.js');


var suite = APIeasy.describe('tnac_bureau');

suite.use(config.host, config.port)
    .discuss('When asking for the aggregated results for a specific centre')
    .path('/tnac/v1/vote')
    .get('/'+ circ_test_id + '/' + deleg_test_id + '/' + centre_test_id)
    .expect(200)
    .expect('should respond with exactly one centre', function (err, res, body) {
        assert.isObject(JSON.parse(body));
    })
    .expect('should have a "resultat" with at least votes for one list ', function (err, res, body) {
        var result = JSON.parse(body);
        assert.isDefined(result.resultat);
        assert.isArray(result.resultat.listes);
        assert.isTrue(result.resultat.listes.length >= 1);
    })
    .expect('should return the votes for the list in descending order', function (err, res, body) {
        var result = JSON.parse(body);
        assert.isDefined(result.resultat);
        assert.isArray(result.resultat.listes);
        assert.isTrue(result.resultat.listes.length >= 1);
        var listes = result.resultat.listes;
        var sorted_listes = listes.sort(function (a,b) {
                                            return b.vote - a.vote;
                                          }
                                       );
        assert.deepEqual(sorted_listes, listes);
    })
    .expect('should provide the expected response', function (err, res, body) {
        assert.deepEqual(expectedResultCentre, JSON.parse(body));
    })
    .undiscuss()
    .unpath()
    .discuss('When asking for the aggregated results for a specific delegation')
    .path('/tnac/v1/vote')
    .get('/'+ circ_test_id + '/' + deleg_test_id )
    .expect(200)
    .expect('should respond with exactly one delegation', function (err, res, body) {
        assert.isObject(JSON.parse(body));
    })
    .expect('should have a "resultat" with at least votes for one list ', function (err, res, body) {
        var result = JSON.parse(body);
        assert.isDefined(result.resultat);
        assert.isArray(result.resultat.listes);
        assert.isTrue(result.resultat.listes.length >= 1);
    })
    .expect('should return the votes for the list in descending order', function (err, res, body) {
        var result = JSON.parse(body);
        assert.isDefined(result.resultat);
        assert.isArray(result.resultat.listes);
        assert.isTrue(result.resultat.listes.length >= 1);
        var listes = result.resultat.listes;
        var sorted_listes = listes.sort(function (a,b) {
                                            return b.vote - a.vote;
                                          }
                                       );
        assert.deepEqual(sorted_listes, listes);
    })
    .expect('should provide the expected response', function (err, res, body) {
        assert.deepEqual(expectedResultDelegation, JSON.parse(body));
    })
    .undiscuss()
    .unpath()
    .discuss('When asking for the aggregated results for a specific circonscription')
    .path('/tnac/v1/vote')
    .get('/'+ circ_test_id )
    .expect(200)
    .expect('should respond with exactly one circonscription', function (err, res, body) {
        assert.isObject(JSON.parse(body));
    })
    .expect('should have a "resultat" with at least votes for one list ', function (err, res, body) {
        var result = JSON.parse(body);
        assert.isDefined(result.resultat);
        assert.isArray(result.resultat.listes);
        assert.isTrue(result.resultat.listes.length >= 1);
    })
    .expect('should return the votes for the list in descending order', function (err, res, body) {
        var result = JSON.parse(body);
        assert.isDefined(result.resultat);
        assert.isArray(result.resultat.listes);
        assert.isTrue(result.resultat.listes.length >= 1);
        var listes = result.resultat.listes;
        var sorted_listes = listes.sort(function (a,b) {
                                            return b.vote - a.vote;
                                          }
                                       );
        assert.deepEqual(sorted_listes, listes);
    })
    .expect('should provide the expected response', function (err, res, body) {
        assert.deepEqual(expectedResultCirconscription, JSON.parse(body));
    })
    .export(module);
