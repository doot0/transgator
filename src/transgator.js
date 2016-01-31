/*

  Transgator
  0-dep i18n micro-lib

*/
var transgator = transgator || {};

transgator.utils = {

	forEach: function(array, callback, scope) {
		if (typeof array === "object") {
			for (var key in array) {
				if (array.hasOwnProperty(key)) {
					callback.call(scope, key, array[key]);
				}
			}
		}
	},

	getJSON: function(url, callback) {
		var req = new XMLHttpRequest();
		req.open('GET', url + '.json');

		req.onload = function() {
			if (req.status == 200) {
				callback(null, JSON.parse(req.response));
			} else {
				callback(Error(req.statusText));
			}
		};

		req.onerror = function() {
			callback(Error("Network error."));
		};

		req.send();
	},

  assignMapValues: function(map, node, name){
    var arr = [];
    arr = map[name] || [];
    arr.push(node);
    map[name] = arr;
  },

	generateHashmap: function(config) {
		var translateTargets = document.querySelectorAll("[" + config.i18n_key + "]");
		var hashmap = {};
		var iterate = transgator.utils.forEach,
        mapvalues = transgator.utils.assignMapValues,
        arr = [];

		iterate(translateTargets, function(index, node) {

			var targetKey = node.getAttribute(config.i18n_key),
				split = targetKey.split("|"),
				keyname = split[0],
				attributes = split.slice(1);

			if (attributes.length) {
				iterate(attributes, function(index, key) {
					var attrKey = keyname + '|' + key;
          mapvalues(hashmap, node, attrKey);
          mapvalues(hashmap, node, keyname);
				});
			} else {
				arr = hashmap[targetKey] || [];
				arr.push(node);
				hashmap[targetKey] = arr;
			}
		});

		return hashmap;
	},

	setLang: function(lang) {
		document.documentElement.setAttribute("lang", lang);
	}

};

transgator.run = function(translateKeys, hashmap, config, lang) {
	var iterate = transgator.utils.forEach;

	iterate(translateKeys, function(key, val) {
		var attrKey = key.split('|'),
			nodeKey = hashmap[key],
			attrName = attrKey[1];

		if (nodeKey) nodeKey.forEach(function(targetNode) {
			if (attrName !== undefined) {
				targetNode.setAttribute(attrName, val);
			} else {
				targetNode.textContent = val;
			}
		});

	});

	transgator.utils.setLang(lang);
};

var Transgator = function(config) {
	this.config = config;
	this.hashmap = transgator.utils.generateHashmap(config);
	return this;
};

Transgator.prototype.lang = function(lang) {

	if (lang === undefined) {
		throw('Must specify a translation lang');
	}

	var _this = this;

	transgator.utils.getJSON(this.config.i18n_dir + lang, function(err, response) {
		if (err) throw('Could not fetch translations');
		transgator.run(response, _this.hashmap, _this.config, lang);
	});

};
