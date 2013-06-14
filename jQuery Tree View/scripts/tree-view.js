(function($){
    $.fn.expandable = function() {
        $(this).find('li>ul').parent().toggleClass('collapsed').click(function(ev) {
            ev.stopPropagation();
            $(this).toggleClass('expanded').find('>ul').toggle();
        });

       return $(this);
    }  
})(jQuery);