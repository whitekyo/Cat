/**
 * Created by yangcheng on 14-11-27.
 */
(function(w){
    /*
	自定义事件注册、绑定、触发组件
    */
    var _eventQueue = {};
    /* 创建事件 */
    var createEvent = function(type,func){
    	if(type){
    		if(!_eventQueue[type]){
    			_eventQueue[type] = [];
    		}
    		_eventQueue[type].push(func || function(){});
    	}
    };
    /* 删除事件 */
    var delEvent = function(type){
    	if(!type){
    		_eventQueue = {};
    	}
    	_eventQueue[type] = [];
    };
    /* 触发事件 */
    var fireEvent = function(type,context){
    	var eventList = _eventQueue[type];
    	if(!eventList){
    		return ;
    	}
    	var l = eventList.length,i = 0;
    	while(i<l){
    		eventList[i].apply(context || window,Array.prototype.slice.call(arguments,1,arguments.length));
    		i++;
    	}
    };
    /* 创建一个event类 */
    var Event = function(){};
    Event.prototype = {
    	constructor: Event,
    	on: createEvent,
    	off: delEvent,
    	trigger: fireEvent
    };
    w.Event = Event;
})(window);