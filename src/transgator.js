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
		req.open('GET', url);

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

	generateHashmap: function(config) {
		var translateTargets = document.querySelectorAll("[" + config.i18n_key + "]");
		var hashmap = {};
		var iterate = transgator.utils.forEach;

		transgator.utils.forEach(translateTargets, function(index, node) {
			var targetKey = node.getAttribute(config.i18n_key),
          split = targetKey.split("|"),
				  keyname = split[0],
				  attributeKeys = split.slice(1);

			if (attributeKeys.length) {
				attributeKeys.forEach(function(key) {
          var generatedKey = keyname + '|' + key;
					var arr = hashmap[generatedKey] || [];
					arr.push(node);
					hashmap[generatedKey] = arr;
				});
			} else {
				var arr = hashmap[targetKey] || [];
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

		if(nodeKey) nodeKey.forEach(function(targetNode) {
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

	var config = config || {
		i18n_key: "data-i18n-key",
		i18n_dir: "./i18n/"
	};

	this.config = config;
	this.hashmap = transgator.utils.generateHashmap(config);

	return this;
};

Transgator.prototype.lang = function(lang) {

	if (lang === undefined) {
		console.error('Must specify a translation lang');
		return;
	}

	var _this = this;

	transgator.utils.getJSON(this.config.i18n_dir + lang, function(err, response) {
		if (err) return console.error('Could not fetch translations');
		transgator.run(response, _this.hashmap, _this.config, lang);
	});

};
