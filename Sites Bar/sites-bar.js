var SitesBar = Class.create({
	init: function(folders, urls) {
		this.folders = folders;
		this.urls = urls;
	},
	getFolders: function() {
		return "Folders: " + this.folders;
	},
	displayUrls: function(urls) {
		var fragment = document.createDocumentFragment();
		for(var i = 0; i < urls.length; i++) {
			var item = document.createElement("li");
			var anchor = document.createElement("a");
			anchor.innerText = urls[i].getTitle();
			anchor.title = urls[i].getTitle();
			anchor.target = "_blank";
			anchor.href = urls[i].getUrl();
			item.appendChild(anchor);
			fragment.appendChild(item);
		}
		return fragment;
	},
	display: function(selector) {
		var container = document.getElementById(selector);
		var list = document.createElement("ul");
		var items = document.createDocumentFragment();
		for(var i = 0; i < this.folders.length; i++) {
			var item = document.createElement("li");
			item.innerText = this.folders[i].getTitle();
			var subList = document.createElement("ul");
			subList.appendChild(this.folders[i].displayUrls(this.urls));
			item.appendChild(subList);
			items.appendChild(item);
		}
		list.appendChild(this.displayUrls(this.urls));
		list.appendChild(items);
		container.appendChild(list);
	}
});

var Folder = Class.create({
	init: function(title, urls) {
		this.urls = urls;
		this.title = title;
	},
	getTitle: function() {
		return this.title;
	},
	displayUrls: function() {
		return this._super.displayUrls(this.urls);
	}
});

var Url = Class.create({
	init: function(title, url) {
		this.title = title;
		this.url = url;
	},
	getTitle: function() {
		return this.title;
	},
	getUrl: function() {
		return this.url;
	}
});

Folder.inherit(SitesBar);

var beemp3 = new Url("Bee mp3", "http://beemp3.com");
var youtube = new Url("Youtube", "http://www.youtube.com");
var mtv = new Url("MTV", "http://www.mtv.com/music/");
var google = new Url("GOOGLE", "http://www.google.com");
var sportal = new Url("Sport News", "http://www.sportal.bg");
var sevenDays = new Url("7 Days Sport", "http://www.7sport.net/‎");

var music = new Folder("Music", [beemp3, youtube]);
var sport = new Folder("Sport", [sportal, sevenDays]);

var favBar = new SitesBar([music, sport], [mtv, google]);

favBar.display("sites-bar");