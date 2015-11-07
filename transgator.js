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
	},

	generateHashmap : function(config) {
		var translateTargets = document.querySelectorAll("[" + config.i18n_key + "]");
		var hashmap = {};
		transgator.utils.forEach(translateTargets, function(index, node){
			var targetKey = node.getAttribute(config.i18n_key);
			var arr = hashmap[targetKey] || [];
			arr.push(node);
			hashmap[targetKey] = arr;
		});
		return hashmap;
	},

	setLang : function(lang){
		document.documentElement.setAttribute("lang", lang);
	}

};

transgator.run = function(translateKeys, hashmap, config, lang){
	var iterate = transgator.utils.forEach;
	iterate(translateKeys, function(key, val) {
		if(hashmap[key]) hashmap[key].forEach(function(targetNode) {
			targetNode.textContent = val;
		});
	});

	transgator.utils.setLang(lang);
};


var Transgator = function(config){

	var config = config || {
		i18n_key: "data-i18n-key",
		i18n_dir: "./i18n/"
	};

	this.config = config;
	this.hashmap = transgator.utils.generateHashmap(config);

	return this;
};

Transgator.prototype.lang = function(lang) {

	if( lang == undefined ){
		console.error('Must specify a translation lang');
		return;
	};

	var _this = this;

	transgator.utils.getJSON(this.config.i18n_dir + lang).then(function(response) {
		transgator.run(response, _this.hashmap, _this.config, lang);
	}, function(error){
		console.error('Could not fetch translations');
	});

};
