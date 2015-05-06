(function(){
	var toString 	= String.prototype.toString,
		trim 		= String.prototype.trim;
	var indexOf		= Array.prototype.indexOf,
		max			= Array.prototype.max,
		min			= Array.prototype.min;
	var util 		= {
		trim: trim ? trim : _trim;
	};
	function _trim(str){
		var whitespace	= "\n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
		for(var i = 0, len = str.length; i < len; i++){
			if(whitespace.indexOf(str.charAt(i)) === -1){
				str = str.substring(i);
				break;
			}
		}
		for(i = str.length - 1; i >= 0; i--){
			if(whitespace.indexOf(str.charAt(i)) === -1){
				str = str.substring(0, i + 1);
				break;
			}
		}
		return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
	}

	function _max(arr){
		return Math.max.apply({}, arr);
	}

	function _min(arr){
		return Math.min.apply({}, arr);
	}

	function createClass(options){
		options = options || {};
		var initialize 	= options.initialize || function(){};
		var superClass 	= options.inherit || Object;
		var klassName 	= options.klassName;
		delete options.initialize;
		delete options.inherit;
		var klass = function(){
			superClass.apply(this, arguments);
			initialize.apply(this, arguments);
		};
		var bridge = function(){};
		bridge.prototype = superClass.prototype;
		klass.prototype = new bridge;
		klass.prototype.superClass = superClass;
		for(var i in options){
			klass.prototype[i] = options[i];
		}
		klass.constructor = arguments.callee;
		klass.prototype.constructor = klass;
		var getKlassContext = function(c){
			var e = c.toString().replace(/[\s\?]/g, '');
			getKlassContext = function(){
				return e;
			};
			return getKlassContext();
		};
		var getKlassName = function(search, context){
			var search = search.toString().replace(/[\s\?]/g, '')
			last = search.length >= 50 ? 50 : search.length;
			search = search.substring(0, last);
			var end = context.indexOf(search), start = end - 100;
			start = start < 0 ? 0 : start;
			var str = context.substring(start, end);
			str = str.match(/var(\w+)\=createClass/);
			return (str && str[1]) ? str[1] : "Object";
		};
		if(!klassName){
			context = getKlassContext(arguments.callee.caller);
			klassName = getKlassName(initialize, context);
			if(klassName == "Object"){
				throw Error("如果没有klassName就必须显式设置initialize");
			}
		}
		klass.toString = function(){
			return "function createClass(){\n [createClass code]\n";
		};
		return klass;
	}

})();