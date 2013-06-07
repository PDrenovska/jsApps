var Slider = {
	init: function(container, images) {
		this.container = document.getElementById(container);
		this.imgs = images;
		this.imageWrapper = document.createElement("div");
		this.imageWrapper.id = 'img-wrapper';
		this.widthWrapper = 216;
		this.imageWrapper.style.width = this.widthWrapper + 'px';
		this.nav = document.createElement("div");
		this.nav.id = 'nav';
	},
	prevButton: function(id) {
		this.prevButton = Object.create(Button);
		this.prevButton.init(id);
	},
	nextButton: function(id) {
		this.nextButton = Object.create(Button);
		this.nextButton.init(id);
	},
	render: function() {
		this.initButton(this.prevButton, this.previous);
		this.initImages();
		this.initButton(this.nextButton, this.next);
	},
	initButton: function(obj, func) {
		var btn = document.createElement("button");
	    btn.id = obj.id;
	    btn.style.cursor = 'pointer';
	    this.nav.appendChild(btn);
	    btn.onclick = func;
	},
	next: function() {
		var slide = document.getElementById("img-slide");
		var position = parseInt(slide.style.left, 10);
		var currentPos = -(parseInt(slide.style.width, 10) - 216);
		if(position > currentPos) {
			position = position - 108;
			slide.style.left = position + "px";
		}
	},
	previous: function() {
		var slide = document.getElementById("img-slide");
		var position = parseInt(slide.style.left, 10);
		if(position < 0) {
			position = position + 108;
			slide.style.left = position + "px";
		}
	},
	initImages: function() { 
		var imagePreview = document.createElement("div");
		imagePreview.id = 'img-preview';

		var imageLarge = document.createElement("img");
        imageLarge.src = this.imgs[0].largeURL;
        imagePreview.appendChild(imageLarge);

		this.container.appendChild(imagePreview);	
		var imageSlide = document.createElement("div");
		imageSlide.style.left = 0;
		imageSlide.id = 'img-slide';
		var width = 0;
        for (var i = 0; i < this.imgs.length; i++) {
            var image = document.createElement("img");
            image.src = this.imgs[i].thumbURL;
            image.title = this.imgs[i].imgTitle;
            image.data = this.imgs[i].largeURL;
            image.onclick = function (ev) {
                imageLarge.src = this.data;
                imagePreview.innerText = '';
                imagePreview.appendChild(imageLarge);
            };
            width += 108;
            imageSlide.style.width = width + "px";
            imageSlide.appendChild(image);
        }
        this.imageWrapper.appendChild(imageSlide);
        this.nav.appendChild(this.imageWrapper);
        this.container.appendChild(this.nav);
	}
};

var SliderImage = {
	init: function(imgTitle, thumbURL, largeURL) {
		this.imgTitle = imgTitle;
		this.thumbURL = thumbURL;
		this.largeURL = largeURL;
	}
};

var Button = {
    init: function (id) {
        this.id = id;
    }
};

var img1 = Object.create(SliderImage);
img1.init("Night Lights", "images/thumbs/img1.jpg", "images/img1.jpg");
var img2 = Object.create(SliderImage);
img2.init("Night Lights", "images/thumbs/img2.jpg", "images/img2.jpg");
var img3 = Object.create(SliderImage);
img3.init("Night Lights", "images/thumbs/img3.jpg", "images/img3.jpg");
var img4 = Object.create(SliderImage);
img4.init("Night Lights", "images/thumbs/img4.jpg", "images/img4.jpg");
var img5 = Object.create(SliderImage);
img5.init("Night Lights", "images/thumbs/img5.jpg", "images/img5.jpg");
var img6 = Object.create(SliderImage);
img6.init("Night Lights", "images/thumbs/img6.jpg", "images/img6.jpg");
var img7 = Object.create(SliderImage);
img7.init("Night Lights", "images/thumbs/img7.jpg", "images/img7.jpg");
var img8 = Object.create(SliderImage);
img8.init("Night Lights", "images/thumbs/img8.jpg", "images/img8.jpg");

var slider = Object.create(Slider);
slider.init("img-slider", [img1, img2, img3, img4, img5, img6, img7, img8]);
slider.prevButton("prevButton");
slider.nextButton("nextButton");
slider.render();