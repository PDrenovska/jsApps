(function($) {
    $.fn.zoom = function () {
        this.on("click", function () {
            var zoomed = $(this).next();
            var parentWidth = $(this).parent().width();
            var thiswidth = zoomed.width();
            var left = parseInt(parentWidth) / 2 - parseInt(thiswidth) / 2 + "px";
            zoomed.css("left", left);
            zoomed.show();
        });
        return this;
    };
    $.fn.collapse = function () {
        this.on("click", function () {
            $(this).hide();
        });
        return this;
    };
}(jQuery))