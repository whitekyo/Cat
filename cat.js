(function(w,_){
	/*
		model part
	*/
	//read model
	var __modelList = [];
	var _readModel = function(){
		var suspend = document.querySelectorAll('[define-model]'),pending = [];
		suspend = _.groupBy(_.map(suspend,function(elm){
			return { 
				modelName :elm.getAttribute('define-model'), 
		 		key: elm.name || elm.getAttribute('name'),
		 		value: (function(elm){
		 			if(elm.type.toLowerCase() == 'checkbox' || elm.type.toLowerCase() == 'radio'){
		 				if(elm.checked){
		 					return true;
		 				}
		 				return false;
		 			}else{
		 				return elm.value || elm.getAttribute('value')
		 			}
		 		})(elm)
		 	};
		}),function(o){
			return o.modelName
		});
		_.each(suspend,function(list){
			pending.push(_createModel(list));
		});
		__modelList = pending;
	};
	//create model
	var _createModel = function(list){
		var staticModel = {},endElm,activeModel = {};
		while(list.length){
			endElm = list.pop();
			if(endElm.modelName && !staticModel.modelName){
				staticModel.modelName = endElm.modelName;
			}
			if(endElm.key){
				staticModel[endElm.key] = endElm.value;
			}
		}
		activeModel = staticModel;
		staticModel = null;
		return activeModel;
	};
	_readModel();
})(window,_);