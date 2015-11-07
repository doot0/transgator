/*

	Transgator
	0-dep i18n micro-lib

*/

var transgator = transgator || {};

transgator.utils = {

	forEach : function(array, callback, scope){

		if(!array) return;

		if ( typeof array === "object" ) {
			for (var key in array){
				if (array.hasOwnProperty(key)) {
					callback.call(scope, key, array[key]);
				}
			}
		}

	},

	getJSON : function(url){
		return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open('GET', url + ".json");

			req.onload = function() {
				if(req.status == 200){
					resolve(JSON.parse(req.response));
				}else{
					reject(Error(req.statusText));
				}
			};

			req.onerror = function() {
				reject(Error("Network error."));
			};

			req.send();
		});
	}

};

transgator.run = function(translateKeys, config){
	var translateTargets = document.querySelectorAll("[" + config.i18n_key + "]");
	var iterate = transgator.utils.forEach;

	iterate(translateTargets, function(index, node){
		var targetNode = node;
	  var targetKey = node.getAttribute(config.i18n_key);
		iterate(translateKeys, function(key, val){
			if(targetKey == key){
				targetNode.textContent = val;
			}
		});
	});

};


var Transgator = function(lang, config){

	if( lang == undefined ){
		console.error('Must specify a translation lang');
		return;
	}

	transgator.utils.getJSON(config.i18n_dir + lang).then(function(response) {
		transgator.run(response, config);
	}, function(error){
		console.error('Could not fetch translations');
	});

};
