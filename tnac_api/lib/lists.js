/**
 * List functions to be exported from the design doc.
 */

//require ('assert');

var fn_setcharset = function() {
      start({
           "headers": {
             "Content-Type": "text/plain;charset=utf-8" 
            }
      }); 
};

var fn_build_result_list = function(rtn, key, value) {
      // Given that rtn is an object, the changes below are gonna be reflected in the variable passed in here
      var key_length = key.length;
      if (key_length >= 3 ) {
          // There is a circonscription field and a list name
          rtn['circonscription'] = key[0];
      }
      if (key_length >= 4) {
          rtn['delegation'] = key[1];
      } else {
          rtn['delegation'] = "ALL";
      }
      if (key_length >= 5) {
          rtn['centre_vote'] = key[2];
      } else {
          rtn['centre_vote'] = "ALL";
      }
      rtn['resultat']['listes'].push({'name' : key[key_length - 1], 'vote': value});
};

var fn_tojson_format = function(index1, index2, array_name, element_name, name1, name2) {
      name1 = typeof(name1) != 'undefined' ? name1 : 'code';
      name2 = typeof(name2) != 'undefined' ? name2 : 'name';
      fn_setcharset();
      var rtn = {}; 
      rtn[array_name] = []; 
      while(row = getRow()) { 
        var value = row.key; 
        rtn[element_name] = {}; 
        rtn[element_name][name1] = value[index1]; 
        rtn[element_name][name2] = value[index2]; 
        rtn[array_name].push(rtn[element_name]);
      } 
      delete rtn[element_name];
      send (toJSON(rtn));
};

var fn_sort_list = function(list) {
      var sorted_list = list.sort(function (a,b) {
                                        return b.vote - a.vote;
                                      }
                                    );
      list = sorted_list;
}

module.exports = {
    'bureau_vote_json' : function (head,req) {
      fn_setcharset();
      var row = getRow(); 
      fn_sort_list(row.doc.resultat.listes);
      delete row.doc._id;
      delete row.doc._rev;
      delete row.doc.circonscription;
      delete row.doc.delegation;
      delete row.doc.centre_vote;
      delete row.doc.bureau_vote;
      send (toJSON(row.doc));
    },
    'bureau_meta_json' : function (head,req) {
      fn_setcharset();
      var row = getRow(); 
      delete row.doc._id;
      delete row.doc._rev;
      delete row.doc.resultat;
      send (toJSON(row.doc));
    },
    'centre_json' : function (head,req) {
      fn_tojson_format(3,4, 'bureaux', 'bureau');
    },
    'delegation_json' : function (head,req) {
      fn_tojson_format(2,3, 'centres', 'centre');
    },
    'circonscription_json' : function (head,req) {
      fn_tojson_format(1,2, 'delegations', 'delegation');
    },
    'all_circonscription_json' : function (head,req) {
      fn_tojson_format(0,1, 'circonscriptions', 'circonscription');
    },
    'all_api_json' : function (head,req) {
      fn_tojson_format(0,1, 'apis', 'api', 'version', 'endpoints');
    },
    'api_json' : function (head,req) {
      fn_setcharset();
      var row = getRow(); 
      delete row.value._id; 
      delete row.value._rev;
      var rtn = {}; 
      rtn.endpoints = row.key[1]; 
      send (toJSON(rtn));
    },
    'liste_json' : function (head,req) {
      fn_setcharset();
      var row = getRow(); 
      delete row.value._id; 
      delete row.value._rev;
      send (toJSON(row.value));
    },
    'all_liste_json' : function (head,req) {
      fn_setcharset();
      var rtn = {}; 
      rtn.listes = []; 
      while(row = getRow()) { 
        var value = row.key; 
        var liste = {}; 
        liste.name = value; 
        rtn.listes.push(liste);
      } 
      send (toJSON(rtn));
    },
    'all_bureau_json' : function (head,req) {
      fn_setcharset();
      var rtn = {};
      var value;
      while(row = getRow()) { 
        value = row.key;
        // we need some type checking and initi to avoid hitting undefined objects 
        rtn[value[3]] = typeof(rtn[value[3]]) != 'undefined' ? rtn[value[3]] : {};
        rtn[value[3]][value[2]] = typeof(rtn[value[3]][value[2]]) != 'undefined' ? rtn[value[3]][value[2]] : {};

        rtn[value[3]][value[2]][value[1]] = value[0]; 
      } 
      send (toJSON(rtn));
    },
    'agg_json' : function (head,req) {
      fn_setcharset();
      var rtn = {};
      rtn['resultat'] = {};
      rtn['resultat']['listes'] = [];
      
      while(row = getRow()) { 
        var key = row.key;
	if (typeof(key) === "object" && Array.isArray(key)) {
            fn_build_result_list(rtn, key, row.value );
        }
      } 
      fn_sort_list(rtn.resultat.listes);
      send (toJSON(rtn));
    }
};
