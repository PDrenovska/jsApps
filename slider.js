(function($) {
    var Slider = {
        init: function (time) {
            _self = this;
            this.enlarged = 0;
            this.setOfSlides = [];
            this.time = time;
            this.slider = $('#slider');
        },
        addSlide: function (code) {
            this.setOfSlides.push(code);
        },
        previous: function(){
            clearInterval(auto);
            auto = setInterval(_self.tick, _self.time);
            if(crnt > 0) {
                current.hide();
                current = current.prev().show();
                crnt -= 1;
            } else {
                crnt = _self.setOfSlides.length - 1;
                current.hide();
                current = $('#slides').children().last();
                current.show();
            }
        },
        next: function(){
            clearInterval(auto);
            auto = setInterval(_self.tick, _self.time);
            if(crnt < _self.setOfSlides.length - 1) {
                current = current.next().show();
                current.prev().hide();
                crnt += 1;
            } else {
                crnt = 0;
                $('#slides').children().last().hide();
                current = $('#slides').children().first();
                current.show();
            }
           
        },
        tick: function() {
           _self.next();
        },
        initButtons: function() {
            var prevbtn = $("<button></button>");
            var nextbtn = $("<button></button>");
            prevbtn.attr('id', 'btn-prev');
            nextbtn.attr('id', 'btn-next');
            prevbtn.on('click', this.previous);
            nextbtn.on('click', this.next);
            this.slider.prepend(prevbtn);
            this.slider.append(nextbtn);
        },
        render: function () {
            this.slider.append('<div id="slides"></div>');
            var slides = $('#slides');
            for (var i = 0; i < this.setOfSlides.length; i++) {
                var slide = $('<div id="slide"></div>');
                slide.append($(this.setOfSlides[i])).hide();
                slides.append(slide);
            }
            slides.children().first().show();
            current = slides.children().first();
            crnt = 0;

            this.initButtons();

            auto = setInterval(this.tick, this.time);
        }
    }

    var slider = Object.create(Slider);
    slider.init(5000);

    slider.addSlide("<h1>Here it is: our cool jQuery slider</h1>");
    slider.addSlide('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum enim et mi ultricies, a sagittis velit bibendum. Etiam vitae velit feugiat, tempus turpis quis, laoreet tellus. Aliquam sodales mi massa, in dictum enim aliquam ac. Cras accumsan justo vitae massa accumsan egestas. Sed bibendum, diam id rhoncus malesuada, nunc mauris ultricies ligula, id feugiat felis nunc quis nisi. Sed imperdiet id turpis blandit feugiat. Praesent tempor vestibulum consequat. Nunc at turpis odio. Ut semper pharetra lorem vel iaculis. Aliquam eget mi id felis hendrerit ullamcorper. Vivamus vehicula, eros id aliquam semper, nulla dui aliquam lorem, ac tempus magna libero interdum tortor. Proin tempor congue tincidunt. Pellentesque at tincidunt ligula, ut feugiat enim. Nam eleifend velit nec facilisis bibendum. Nulla tempus dictum lacus, nec tempor eros venenatis vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum enim et mi ultricies, a sagittis velit bibendum. Etiam vitae velit feugiat, tempus turpis quis, laoreet tellus. Aliquam sodales mi massa, in dictum enim aliquam ac. Cras accumsan justo vitae massa accumsan egestas. Sed bibendum, diam id rhoncus malesuada, nunc mauris ultricies ligula, id feugiat felis nunc quis nisi. Sed imperdiet id turpis blandit feugiat. Praesent tempor vestibulum consequat. Nunc at turpis odio. Ut semper pharetra lorem vel iaculis. Aliquam eget mi id felis hendrerit ullamcorper. Vivamus vehicula, eros id aliquam semper, nulla dui aliquam lorem, ac tempus magna libero interdum tortor. Proin tempor congue tincidunt. Pellentesque at tincidunt ligula, ut feugiat enim. Nam eleifend velit nec facilisis bibendum. Nulla tempus dictum lacus, nec tempor eros venenatis vel.</p>');
    slider.addSlide('<img src="images/telerik-academy-banner-300x250.jpg">');
    slider.addSlide('<ul><li><a href="http://www.google.com">Google</a></li><li><a href="http://forums.academy.telerik.com/">Telerik Academy Forum</a></li></ul>');
    slider.addSlide('<div class="post"><h2> <a href="#">Great Ways to Learn jQuery</a></h2><div class="entry"><p>These jQuery resources will set you on the path towards mastering jQuery.</p><h4>Written Articles</h4><ul><li><a href="#">Getting Started with jQuery</a> &#8211; this is the official jQuery getting started guide.</li><li><a href="#">jQuery for JavaScript Programmers</a> &#8211; Simon Willison (creator of django) gives you an introduction to jQuery for people who already understand JavaScript.</li><li><a href="#">jQuery Crash Course</a> &#8211; Nathan Smith gives a quick introduction to jQuery on Digital Web Magazine.</li><li><a href="#">Introduction to jQuery</a> &#8211; Rick Strahl, well-known for his work developing with Microsoft technologies, gives his introduction to jQuery with part two covering <a href="#">using jQuery with ASP.NET.</a></li></ul><h4>E-Books</h4><ul><li><a href="#">jQuery Fundamentals</a> &#8211; open-source e-book written by Rebecca Murphey in collaboration with other well-known members of the jQuery community.</li><li><a href="#">jQuery Enlightenment</a> &#8211; Cody Lindley&#8217;s e-book covers advanced topics on jQuery with links to working code examples in jsbin.</li></ul><p><a href="http://www.learningjquery.com/2010/07/great-ways-to-learn-jquery#more-1164" class="more-link">Read the rest of this entry &raquo;</a></p></div>');

    slider.render();
})(jQuery);
