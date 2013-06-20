/*
 * jQuery plugin to hide and show menu items
 */

(function($) {
    $.fn.treeview = function(params) {

    	// Initializing the parameters with default values
    	var settings = { collapsed: true, speed: 500 };
    	if(!params) 
    		var params = {};
    	if(params.collapsed != undefined) {
    		var collapsed = params.collapsed;
    	} else {
    		var collapsed = settings.collapsed;
    	}
    	if(params.speed != undefined) {
    		var speed = params.speed;
    	} else {
    		var speed = settings.speed;
    	}
	    if(collapsed == false) {
	    	$(this).find('li>ul').show();
	    } else {
	    	$(this).find('li>ul').hide();
	    }	
	    $(this).click('li', function(ev) {
	        ev.stopPropagation();
	        $(ev.target).find('>ul').toggle(speed);
	    });

	   return $(this);
	}	
})(jQuery);