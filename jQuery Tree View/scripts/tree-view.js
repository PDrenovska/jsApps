(function($){
    $.fn.expandable = function() {
    	$(this).find("a").click(function(ev) {
    		ev.stopPropagation();
    	});
        $(this).find('li>ul').parent().toggleClass('collapsed').click(function(ev) {
            ev.stopPropagation();
            $(this).toggleClass('expanded').find('>ul').toggle();
        });

       return $(this);
    }  
})(jQuery);