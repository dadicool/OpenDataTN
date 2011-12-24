/**
 * Rewrite settings to be exported from the design doc
 */
var version = "v1";

module.exports = [
    {from: version + '/vote/:circonscription/:delegation/:centre_vote/:bureau_vote', 
     to: '_list/bureau_json/bureau_vote',
     query: { 
       'include_docs' : 'true',
       'key' : [
         ":bureau_vote",
         ":centre_vote",
         ":delegation",
         ":circonscription"
       ]
     } 
    },
    {from: version + '/vote/:circonscription/:delegation/:centre_vote', 
     to: '_list/agg_json/agg_centre',
     query: { 
       'startkey' : [
         ":circonscription",
         ":delegation",
         ":centre_vote"
       ],
       'endkey' : [
         ":circonscription",
         ":delegation",
         ":centre_vote",
         {}
       ],
       'group' : 'true'
     } 
    },
    {from: version + '/vote/:circonscription/:delegation', 
     to: '_list/agg_json/agg_delegation',
     query: { 
       'startkey' : [
         ":circonscription",
         ":delegation"
       ],
       'endkey' : [
         ":circonscription",
         ":delegation",
         {}
       ],
       'group' : 'true'
     } 
    },
    {from: version + '/vote/:circonscription', 
     to: '_list/agg_json/agg_circonscription',
     query: { 
       'startkey' : [
         ":circonscription"
       ],
       'endkey' : [
         ":circonscription",
         {}
       ],
       'group' : 'true'
     } 
    },
    {from: version + '/meta/:circonscription/:delegation/:centre_vote', 
     to: '_list/centre_json/centre_vote',
     query: { 
       'startkey' : [
         ":centre_vote",
         ":delegation",
         ":circonscription"
       ],
       'endkey' : [
         ":centre_vote",
         ":delegation",
         ":circonscription",
         {}
       ],
       'group' : 'true'
     }
    },
    {from: version + '/meta/:circonscription/:delegation', 
     to: '_list/delegation_json/delegation',
     query: { 
       'startkey' : [
         ":delegation",
         ":circonscription"
       ],
       'endkey' : [
         ":delegation",
         ":circonscription",
         {}
       ],
       'group' : 'true'
     } 
    },
    {from: version + '/meta/:circonscription', 
     to: '_list/circonscription_json/circonscription',
     query: { 
       'group' : 'true',
       'startkey' : [
         ":circonscription"
       ],
       'endkey' : [
         ":circonscription",
         {}
       ]
     } 
    },
    {from: version + '/meta', 
     to: '_list/all_bureau_json/bureau_vote'
    },
    {from: version + '/liste', 
     to: '_list/all_liste_json/all_listes',
     query: { 
       'group' : 'true'
     } 
    },
    {from: '', 
     to: '_list/all_api_json/all_apis',
     query: { 
       'group' : 'true'
     } 
    },
    {from: ':api', 
     to: '_list/api_json/all_apis',
     query: { 
       'startkey' : [
         ":api"
       ],
       'endkey' : [
         ":api",
         {}
       ],
       'group' : 'true'
     } 
    },
    {from: '/static/*', to: 'static/*'},
//    {from: '*', to: '_show/not_found'},
    {from: '/', to: '_show/welcome'}
];
