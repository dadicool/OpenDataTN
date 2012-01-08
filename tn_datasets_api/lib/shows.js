/**
 * Show functions to be exported from the design doc.
 */

var templates = require('duality/templates');

log("templates ="+ templates);


exports.welcome = function (doc, req) {
    return {
        title: 'It worked Title!',
        content: templates.render('welcome.html', req, {})
    };
};

exports.not_found = function (doc, req) {
    return {
        title: "OpenGovTN - We don't have it yet!",
        content: templates.render('base.html', req, {})
    };
};
