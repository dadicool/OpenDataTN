[![Build Status](https://secure.travis-ci.org/dadicool/OpenDataTN.png)](http://travis-ci.org/dadicool/OpenDataTN)


Introduction
------------
This API makes available various public data sets under the OpenGovTN initiative.

The initial data set has been collected from the ISIE website which made the Tunisian Constritutional Assembly election results available to the public

API : MetaData Endpoint
-----------------------
### DataSet endpoints available
* GET /api
  * Options :
    * ?limit=N : return the first N entries
  * Return : JSON representation of the Dataset endpoints available. 
  * Example : GET /api

    [{"dataset":"tnac","description":"Tunisian Constituant Assembly Elections"}]

### DataSet description
* GET /api/dataset
  * Return : JSON representation of the Dataset endpoint. 
  * Example : GET /api/tnac

    [{"dataset":"tnac","description":"Tunisian Constituant Assembly Elections"}]

API : DataSet Endpoint
-----------------------

* DataSet Name : DATASET = tnac
* Version : VERSION = v1

### API Versions for a DataSet
* GET /DATASET
  * Options :
    * ?limit=N : return the first N entries
  * Return : JSON representation of the API versions available. 
  * Example : GET /tnac

    {"apis":[{"version":"v1","endpoints":["meta-all","meta","vote"]}]}

### Endpoints for an API version
* GET /DATASET/VERSION
  * Options :
    * ?limit=N : return the first N entries
  * Return : JSON representation of the REST resources available in the specified API version. 
  * Example : GET /tnac/v1

    {"endpoints":["meta-all","meta","vote"]}

### MetaData
#### All Metadata in Bulk
* GET /DATASET/VERSION/meta-all
  * Return : JSON representation of the whole tree of circonscription/delegation/centre/bureau 
  * Example : GET /tnac/v1/meta-all

#### Metadata of the first level in gerographical hierarchy (i.e. circonscriptions)
* GET /DATASET/VERSION/meta
  * Options :
    * ?limit=N : return the first N entries
  * Return : JSON representation of the list of all circonscriptions
  * Example : GET /tnac/v1/meta?limit=2

    {"circonscriptions":[{"code":"111","name":"تونس 1"},{"code":"112","name":"تونس 2"}]}

#### Metadata of the second level in geographical hierarchy (i.e. delegations)
* GET /DATASET/VERSION/meta/X
  * Options :
    * ?limit=N : return the first N entries
  * Return : JSON representation of the list of delegations for circonscription X
  * Example : GET /tnac/v1/meta/111?limit=3

    {"delegations":[{"code":"52","name":"المدينة"},{"code":"53","name":"باب البحر"},{"code":"54","name":"باب سويقة"}]}

#### Metadata of the third level in geographical hierarchy (i.e. centres)
* GET /DATASET/VERSION/meta/X/Y
  * Options :
    * ?limit=N : return the first N entries
  * Return : JSON representation of the list of centres for circonscription X and delegation Y
  * Example : GET /tnac/v1/meta/111/54?limit=2

    {"centres":[{"code":"001","name":"م إبتدائية نهج الأقواس - باب سعدون"},{"code":"002","name":"م إبتدائية  3نهج قليبية - باب الخضراء"}]}

#### Metadata of the forth level in geographical hierarchy (i.e. centres)
* GET /DATASET/VERSION/meta/X/Y/Z
  * Options :
    * ?limit=N : return the first N entries
  * Return : JSON representation of the list of bureaux for circonscription X, delegation Y and centre Z
  * Example : GET /tnac/v1/meta/111/54/002?limit=1

   {"bureaux":[{"code":"01","name":"قاعة 1"}]} 

#### Metadata of specific Bureau
* GET /DATASET/VERSION/meta/X/Y/Z/T
  * Return : JSON representation of the summary of information for a bureau T in circonscriptionX, delegation Y and centre Z
  * Example : GET /tnac/v1/meta/111/54/002/01

   

### Votes
#### Votes aggregated per liste at the highest level in gerographical hierarchy (i.e. circonscriptions)
* GET /DATASET/VERSION/vote/X
  * Options :
    * ?limit=N : return the first N entries
  * Return : JSON representation of the # of votes each liste received in circonscription X 
  * Example : GET /tnac/v1/vote/111?limit=3

    {"resultat":{"listes":[{"name":"قائمة أصحاب الشعب","vote":4},{"name":"قائمة ائتلاف الأمة","vote":2},{"name":"قائمة ائتلاف الكرامة","vote":5}]},"circonscription":"111","delegation":"52","centre":"001"}

#### Votes aggregated per liste at the second level in gerographical hierarchy (i.e. delegations)
* GET /DATASET/VERSION/vote/X/Y
  * Options :
    * ?limit=N : return the first N entries
  * Return : JSON representation of the # of votes each liste received in circonscription X, Delegation Y 
  * Example : GET /tnac/v1/vote/111/52?limit=3

    {"resultat":{"listes":[{"name":"قائمة أصحاب الشعب","vote":27},{"name":"قائمة ائتلاف الأمة","vote":8},{"name":"قائمة ائتلاف الكرامة","vote":53}]},"circonscription":"111","delegation":"52"}

#### Votes aggregated per liste at the third level in gerographical hierarchy (i.e. centres)
* GET /DATASET/VERSION/vote/X/Y/Z
  * Options :
    * ?limit=N : return the first N entries
  * Return : JSON representation of the # of votes each liste received in circonscription X, Delegation Y, centre Z 
  * Example : GET /tnac/v1/vote/111/52/002?limit=2

    {"resultat":{"listes":[{"name":"قائمة أصحاب الشعب","vote":3},{"name":"قائمة ائتلاف الكرامة","vote":18}]},"circonscription":"111","delegation":"52","centre":"002"}

#### Votes aggregated per liste at the fourth level in gerographical hierarchy (i.e. bureaux)
* GET /DATASET/VERSION/vote/X/Y/Z/T
  * Return : JSON representation of the # of votes each liste received in circonscription X, Delegation Y, centre Z, Bureau T 
  * Example : GET /tnac/v1/vote/111/52/002/01
    {"delegation":{"name":"المدينة","code":"52"},"circonscription":{"name":"تونس 1","code":"111"},"bureau_vote":{"name":"قاعة 1","code":"01"},"centre_vote":{"name":"م إبتدائية نهج الحكيم كسار - الحفصية","code":"002"},"resultat":{"listes":[{"num":74,"pourcentage":40.66999816894531,"vote":314,"name":"قائمة حركة النهضة"},{"num":9,"pourcentage":18.1299991607666,"vote":140,"name":"قائمة حزب التكتل الديمقراطي من أجل العمل والحريات"},{"num":59,"pourcentage":9.069999694824219,"vote":70,"name":"قائمة حزب المؤتمر من أجل الجمهورية"},{"num":16,"pourcentage":4.269999980926514,"vote":33,"name":"قائمة القطب الديمقراطي الحداثي"},{"num":31,"pourcentage":2.589999914169312,"vote":20,"name":"قائمة الحزب الديمقراطي التقدمي"},{"num":52,"pourcentage":1.940000057220459,"vote":15,"name":"قائمة حزب آفاق تونس"},{"num":48,"pourcentage":1.549999952316284,"vote":12,"name":"قائمة حزب العمال الشيوعي التونسي (البديل الثوري)"},{"num":79,"pourcentage":1.299999952316284,"vote":10,"name":"قائمة الوحدة الوطنية"},{"num":67,"pourcentage":1.169999957084656,"vote":9,"name":"قائمة الائتلاف الديمقراطي المستقل - طريق السلامة -"},{"num":7,"pourcentage":1.039999961853027,"vote":8,"name":"قائمة المســاواة"},{"num":15,"pourcentage":0.9100000262260437,"vote":7,"name":"قائمة العريضة الشعبية للحرية والعدالة والتنمية"},{"num":76,"pourcentage":0.9100000262260437,"vote":7,"name":"قائمة حزب العدل والتنمية"},{"num":2,"pourcentage":0.7799999713897705,"vote":6,"name":"قائمة الائتلاف التحرري"},{"num":54,"pourcentage":0.7799999713897705,"vote":6,"name":"قائمة حزب النضال التقدمي"},{"num":64,"pourcentage":0.7799999713897705,"vote":6,"name":"قائمة الاتحاد الوطني الحر"},{"num":63,"pourcentage":0.6499999761581421,"vote":5,"name":"قائمة مستقلون وأحرار"},{"num":3,"pourcentage":0.5199999809265137,"vote":4,"name":"قائمة حزب الكرامة والعمل"},{"num":44,"pourcentage":0.5199999809265137,"vote":4,"name":"قائمة ائتلاف الكرامة"},{"num":5,"pourcentage":0.5199999809265137,"vote":4,"name":"قائمة حزب الكرامة من أجل العدالة والتنمية"},{"num":49,"pourcentage":0.5199999809265137,"vote":4,"name":"قائمة حركة الوحدة الشعبية"},{"num":19,"pourcentage":0.5199999809265137,"vote":4,"name":"قائمة حزب العمل التونسي"},{"num":65,"pourcentage":0.5199999809265137,"vote":4,"name":"قائمة الاتحاد الديمقراطي الوحدوي"},{"num":30,"pourcentage":0.5199999809265137,"vote":4,"name":"قائمة حزب المـجــد"},{"num":1,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة حركة الشعب الوحدوية التقدمية"},{"num":47,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة الشعب أراد الحياة"},{"num":61,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة المصالحة والبناء"},{"num":22,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة حركة الشعب"},{"num":24,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة حزب الخضر للتقدّم (الخضر)"},{"num":25,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة الشعب يريد الحياة الآمنة والحرية"},{"num":27,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة حزب العمل الوطني الديمقراطي"},{"num":69,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة حركة البعث"},{"num":71,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة الحزب الدستوري الجديد"},{"num":32,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة الحركة الإصلاحية التونسية"},{"num":33,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة التآلف الجمهوري"},{"num":77,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة التسامح"},{"num":39,"pourcentage":0.3899999856948853,"vote":3,"name":"قائمة حزب الوحدة الشعبية"},{"num":41,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة حزب الأمانة"},{"num":42,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة حزب الثقافة والعمل"},{"num":6,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة حزب الوفاق الجمهوري"},{"num":13,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة العلم والعمل"},{"num":57,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة حزب الإصلاح والتنمية"},{"num":17,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة التشغيل والتنمية"},{"num":18,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة الشعب يريد"},{"num":66,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة الحزب التونسي"},{"num":68,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة الحركة التقدمية التونسية (يزينا قهر ... يزينا حقرة)"},{"num":28,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة حزب الأمة الديمقراطي الاجتماعي"},{"num":70,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة الأحرار التقدميين"},{"num":72,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة الاتحاد الشعبي الجمهوري"},{"num":78,"pourcentage":0.2599999904632568,"vote":2,"name":"قائمة الحركة التونسية للعمل المغاربي"},{"num":46,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة حركة الديمقراطية والتنمية"},{"num":8,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة الخـــلاص"},{"num":50,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة الحزب الديمقراطي للعدالة والرخاء"},{"num":10,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة حركة مواطنة"},{"num":51,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة المدقـق"},{"num":56,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة الوفاء لشهداء الثورة"},{"num":60,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة حزب الأحرار لتونس (الأحرار)"},{"num":21,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة تونس الكرامة"},{"num":73,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة الوفاء والالتزام"},{"num":75,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة حزب التقدم"},{"num":35,"pourcentage":0.1299999952316284,"vote":1,"name":"قائمة حزب العدالة الاجتماعي الديمقراطي (ناخو حقي)"},{"num":43,"pourcentage":0,"vote":0,"name":"قائمة الحزب الشعبي للحرية والتقدّم"},{"num":4,"pourcentage":0,"vote":0,"name":"قائمة حزب اليسار الحديث"},{"num":45,"pourcentage":0,"vote":0,"name":"قائمة حركة الديمقراطيين الاشتراكيين"},{"num":11,"pourcentage":0,"vote":0,"name":"قائمة الورقة الخضراء"},{"num":12,"pourcentage":0,"vote":0,"name":"قائمة عينك على بلادك"},{"num":53,"pourcentage":0,"vote":0,"name":"قائمة الياسمين"},{"num":14,"pourcentage":0,"vote":0,"name":"قائمة ائتلاف الأمة"},{"num":55,"pourcentage":0,"vote":0,"name":"قائمة معا لبناء مستقبل تونس"},{"num":58,"pourcentage":0,"vote":0,"name":"قائمة الوفاء للشهداء"},{"num":20,"pourcentage":0,"vote":0,"name":"قائمة العمل والإصلاح"},{"num":62,"pourcentage":0,"vote":0,"name":"قائمة الحزب الليبرالي المغاربي"},{"num":23,"pourcentage":0,"vote":0,"name":"قائمة حزب التحالف الوطني للسلم والنماء"},{"num":26,"pourcentage":0,"vote":0,"name":"قائمة الصفاء"},{"num":29,"pourcentage":0,"vote":0,"name":"قائمة أصحاب الشعب"},{"num":34,"pourcentage":0,"vote":0,"name":"قائمة المستقلون"},{"num":36,"pourcentage":0,"vote":0,"name":"قائمة الازدهار والتقدم"},{"num":37,"pourcentage":0,"vote":0,"name":"قائمة حزب الحرية والتنمية"},{"num":38,"pourcentage":0,"vote":0,"name":"قائمة الرحمة"},{"num":40,"pourcentage":0,"vote":0,"name":"قائمة صوت الثورة"}],"bulletins":{"endommage":6,"dans_urne":807,"correct":772,"non_utilise":189,"delivre":1000,"blancs":14,"annule":21},"electeurs":{"votant":807,"enregistre":896}}}


API Development
---------------
We use [Kanso](http://kan.so/) as an easy tool to manage the CouchDB databases associated with the various API endpoints.

Each of the API metadata or data endpoints is going to consist of a Kanso (couch)app and reside in a separate directory.

Kanso is pretty straightforward and allows for collaboration around couch design documents. It allows simplifies reuse in views/show/list functions which helps maintainability

For detailed instructions of how to setup your own dev environment for one of the API endpoints, please go into the corresponding directory.

Testing
-------
In order to run the full test suite:

    $ npm install
    $ npm test
