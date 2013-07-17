var MainMenu = {

    create: function (hotel) {
        this.hotel = hotel;
        this.menu = $("<div></div>");
    },
    addRoom: function () {

    },
    addCat: function (name) {
        if (name == null || name.length > 10) {
            alert("wrong name");
            return;
        }
        name = safeTags(name);
        if (name == "Dragon" && !this.hotel.hasDragon) {
            var dragon = Object.create(Dragon);
            $('audio').attr('src', 'sound/CatMetal.mp3');
            dragon.initialize();
            this.hotel.hasDragon = true;
            this.hotel.addCat(dragon);
            this.hotel.render();

            $('#hotel-menu').css({ 'background': 'url("images/layout/bckgr-header-dark.jpg")' });
            $('#wrapper').css({ 'background': 'url("images/layout/bckgr-slice-dark.jpg")' });
            $('footer').attr("class", "dark-footer");
            $('#settings').attr('class', 'dark');
        }
        else {
            var cat = Object.create(Cat);
            cat.initialize(name, 10, 10, 10, 20);
            this.hotel.addCat(cat);
            this.hotel.render();
        }
        jQuery(settings).toggle();

        function safeTags(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    },
    renameHotel: function (newName) {
        newName = safeTags(newName);
        jQuery(settings).toggle();
        this.hotel.rename(newName);
        this.renderName();

        function safeTags(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    },
    renameHotelForm: function () {
        var _self = this;
        var form = $("<form />");
        var itemForm = $("<div></div>");
        var input = $("<input />");
        var button = $("<button />").text('Rename Hotel');
        button.on("click", function (ev) {
            ev.preventDefault();
            if (input.val().length > 0) {

                _self.renameHotel(input.val());
            }
            else {
                var alertWrongNameHotel = $("<div class='alert'>Hotel name cannot be empty!</div>");
                $("#settings").append(alertWrongNameHotel);
                setTimeout(function () {
                    $("#settings .alert").remove();
                }, 3000);

            }
        });
        form.append(input).append(button);
        itemForm.append(form);
        return itemForm;
    },
    addCatForm: function () {
        var _self = this;
        var form = $("<form />");
        var itemForm = $("<div></div>");
        var input = $("<input />");
        var button = $("<button />").text('Add Cat');
        button.on("click", function (ev) {
            ev.preventDefault();
            if (input.val().length > 0) {
                _self.addCat(input.val());
            }
            else {
                var alertWrongName = $("<div class='alert'>Cat name cannot be empty!</div>");
                $("#settings").append(alertWrongName);
                setTimeout(function () {
                    $("#settings .alert").remove();
                }, 3000);
            }
        });
        form.append(input).append(button);
        itemForm.append(form);
        return itemForm;
    },
    addScoreForm: function () {
        var button = $("<button />").text('Scoreboard').attr('id', 'scoreboard-btn');
        button.on("click", function (ev) {
            ev.preventDefault();
            if($(".alert").length > 0) {
                return;
            }
            loadScoreGame();
        });

        return button;
    },
    renderName: function () {
        var hotelName = this.hotel.getName();
        $("h1").text(hotelName);
    },
    muteAutio: function () {
        var button = $("<button />").attr('id', 'audio-btn');

        button.on('click', function (ev) {
            ev.preventDefault();
            var audio = document.getElementById('audio-bc');
            $("#audio-btn").toggleClass("off");
            if (audio.muted == true) {

                audio.muted = false;
            }
            else {
                audio.muted = true;
            }

        });

        return button;
    },
    render: function () {
        var settings = $("<div>");
        settings.attr('id', 'settings');
        this.menu.attr('id', 'hotel-menu');
        var itemName = $("<h1></h1>");
        var settingsBtn = $("<button />");
        settingsBtn.attr('id', 'settings-btn');

        settingsBtn.on('click', function () {
            jQuery(settings).toggle();
        });

        this.menu
        .append(settingsBtn)
        .append(itemName);

        settings
        .append(this.addCatForm())
        .append(this.renameHotelForm())
        .append(this.muteAutio())
        .append(this.addScoreForm())
        .hide();

        var body = $("body");
        body.prepend(this.menu);
        body.prepend(settings);
        this.renderName();
        this.hotel.render();
    }

};

var SocialShareMenu = {
    create: function () {
        this.menu = $("<div></div>");
    },
    render: function () {
        this.menu.attr('id', 'social-menu');
        this.menu.append('<g:plusone size="standard" href="https://plus.google.com/u/0/109606018059232551511/posts"></g:plusone>');
        $("#hotel-menu").append(this.menu);
    }
};

var Hotel = {
    initialize: function (name, capacity) {
        _self = this;
        this.hasDragon = false;
        this.name = name;
        this.rooms = [];
        this.capacity = capacity;
        this.occupied = 0;
        for (var j = 0; j < this.capacity; j++) {
            var room = Object.create(Room);
            room.initialize();
            this.rooms.push(room);
        }
    },
    addRoom: function (room) {
        this.rooms.push(room);
    },
    addCat: function (cat) {
        if (cat.catid == "dragon") {
            this.rooms[11].addRoomer(cat);
            this.occupied += 1;
        }
        else {
            for (var i = 0; i < this.rooms.length; i++) {
                if (this.rooms[i].isFree()) {
                    this.rooms[i].addRoomer(cat);
                    this.occupied += 1;
                    break;
                }
            }
        }
    },
    rename: function (name) {
        this.name = name;
    },
    removeRoom: function () {
        if (this.rooms.length > 0) {
            this.rooms.pop(rooms[rooms.length - 1]);
        } else {
            console.log("You can not remove room. There are no rooms!");
        }

    },
    numOccupiedRooms: function () {
        return this.occupied;
    },
    getName: function () {
        return this.name;
    },
    numFreeRooms: function () {
        var rooms = this.capacity - this.occupied;
        return rooms;
    },
    gameOver: function () {
        if (this.rooms.length > 0) {
            var freeRoomsCount = this.rooms.length;
            for (var i = 0; i < this.rooms.length; i++) {
                if (this.rooms[i].roomer != null && this.rooms[i].roomer._super.health == 0) {
                    freeRoomsCount--;
                }
            }

            if (freeRoomsCount == 0) {
                var alertGameOver = $("<div id='gameOver'> Game over! </div>");
                alertGameOver.append('<input type="text" id="nickname" />');

                $("#get-name").on('click', function () {
                    var name = $('#nickname').val();
                    console.log(name);
                });
                $("#hotel").append(alertGameOver);
                var isGameOver = true;
                return isGameOver;
            }
        }
    },
    render: function () {
        $("#hotel").html('');
        if (this.rooms.length > 0) {
            for (var i = 0; i < this.rooms.length; i++) {
                var room = this.rooms[i].render();
                this.rooms[i].id = i;
                room.attr('id', 'room' + i);
                $("#hotel").append(room);
                $('#room' + i + ' > div > img').attr('id', 'cat' + i);
            }
        }

        if (this.hasDragon) {
            $('#room11 > div > img').attr('id', 'dragon');
        }

        var _self = this;

        var timer = 0;
        var gameOverTotal = false;

        var interval = setInterval(function () {
            timer++;

            if (gameOverTotal) {
                clearInterval(interval);
                return;
            }

            if (_self.rooms.length > 0) {
                for (var i = 0; i < _self.rooms.length; i++) {
                    if (_self.rooms[i].roomer != null && _self.rooms[i].roomer._super.health > 0) {
                        var room = $('#room' + i + ' > div > p')[0];

                        if (_self.hasDragon && i == 11) {
                            room.innerHTML = "<img src='images/healthIndicator.png' /> "
                            + _self.rooms[i].roomer._super.health + " "
                            + "<img src='images/dragonHealth.png' />   "
                            + _self.rooms[i].roomer._super.hunger;
                        }
                        else {
                            room.innerHTML = "<img src='images/healthIndicator.png' /> "
                            + _self.rooms[i].roomer._super.health + " "
                            + "<img src='images/foodIndicator.png' />   "
                            + _self.rooms[i].roomer._super.hunger + " "
                            + "<img src='images/layout/smile.png' /> "
                            + _self.rooms[i].roomer.mood;
                        }

                        if (timer % 3 == 0) {
                            var image = $('#room' + i + ' > div > img');
                            var src = image.attr('src');

                            if (src.indexOf('b') != -1) {
                                src = src.substring(src.indexOf('/'), src.indexOf('b'));
                                image.attr('src', 'images' + src + '.png');
                            }
                            else {
                                src = src.substring(src.indexOf('/'), src.indexOf('.'));
                                image.attr('src', 'images' + src + 'b.png');
                            }
                        }
                    }
                    else if (_self.rooms[i].roomer != null && _self.rooms[i].roomer._super.health == 0) {
                        room = $('#room' + i)[0];

                        room.innerHTML = "<h2>No vacancy</h2><img class='portrait' src='images/X.png' />";
                    }
                }
                if (_self.gameOver()) {
                    gameOverTotal = true;
                }
            }
        }, 1000);
    }
};

var Room = {
    initialize: function () {
        this.occupied = false;
        this.roomer = null;
        this.id = null;
    },
    addRoomer: function (cat) {
        this.roomer = cat;
        this.occupied = true;
    },
    isFree: function () {
        if (this.occupied === false) {
            return true;
        }
        else return false;
    },
    removeRoomer: function () {
        if (this.roomer != null) {
            this.roomer = null;
            this.occupied = false;
            $('#room' + this.id + ' > h2').remove();
            $('#room' + this.id + ' > div').remove();
            $('#room' + this.id + ' > button').remove();
        }
    },
    render: function () {
        var _self = this;
        var room = $("<div></div>");
        room.attr('class', 'room');

        if (this.roomer != null && this.roomer._super.health > 0) {
            var name = $("<h2></h2>");
            name.text(this.roomer.introduce());

            var removeCat = $('<button/>');
            removeCat.attr('class', 'delete');
            removeCat.on('click', function () {
                _self.removeRoomer();
            });

            if (this.roomer.catid == "dragon") {
                room.append(name).append(this.roomer.portrait());
            }
            else {
                room.append(removeCat).append(name).append(this.roomer.portrait());
            }
        }
        else if (this.roomer != null && this.roomer._super.health > 0) {
            room.append("<h2>No vacancy</h2><img src='images/X.png' />");
        }

        return room;
    }
};

var Animal = {
    initialize: function (name, age, health, hunger) {
        this.name = name;
        this.age = age;
        this.health = health;
        this.hunger = hunger;
    }
};

var generatedCats = [];

var Cat = Animal.extendmethod({
    initialize: function (name, age, health, hunger, mood) {
        this._super = Object.create(this._super);
        this._super.initialize(name, age, health, hunger);
        this.mood = mood;
        this.catid = null;

        var generateNumber = Math.floor((Math.random() * 14) + 1);

        while ($.inArray(generateNumber, generatedCats) > -1 && generatedCats.length <= 13) {
            generateNumber = Math.floor((Math.random() * 14) + 1);
        }

        generatedCats.push(generateNumber);

        this.image = "images/cat" + generateNumber + ".png";
        var _self = this;
        var passedTime = 0;
        var startHunger = this._super.hunger;

        var currentInterval = setInterval(function () {

            passedTime += 1000;

            if (_self._super.hunger == 0) {
                _self._super.hunger = startHunger;
                _self._super.health--;
            }

            if (passedTime % 1000 == 0) {
                passedTime = 0;
                _self._super.hunger--;
            }

            if (_self._super.health == 0) {
                _self._super.hunger = 0;
                _self.image = 'images/X.png';
                clearInterval(currentInterval);
            }

        }, 1000);

        var currentMoodInterval = setInterval(function () {

            passedTime += 1000;

            if (passedTime % 1000 == 0) {
                _self.mood--;
            }

            if (_self.mood == 0) {
                clearInterval(currentMoodInterval);
            }

        }, 1000);
    },

    introduce: function () {
        return this._super.name;
    },
    portrait: function () {
        var div = $('<div>');
        var img = $("<img>");
        img.attr('src', this.image);
        img.attr('alt', this._super.name);
        img.attr('class', 'draggable portrait');
        img.attr('draggable', true);
        img.attr('ondragstart', 'drag(event)');
        img.attr('ondrop', 'findCat(event)');
        img.attr('ondragover', 'allowDrop(event)');

        div.append(img);
        div.append("<p> <img src='images/healthIndicator.png'  />   " + this._super.health + "    " + " <img src='images/foodIndicator.png' />   "
        + this._super.hunger + "   " + " <img src='images/layout/smile.png' style='height: 18px; width: 18px '/>   " + this.mood + "</p>");
        return div;
    }
});

var Dragon = Animal.extendmethod({
    initialize: function () {
        this._super = Object.create(this._super);
        this._super.initialize("Dragon", 1, 1, 1000);
        this.catid = "dragon";

        this.image = "images/Dragon.png";
        var _self = this;
        var passedTime = 0;
        var startHunger = this._super.hunger;

        var currentInterval = setInterval(function () {

            passedTime += 1000;

            if (_self._super.hunger == 0) {
                _self._super.hunger = startHunger;
                _self._super.health--;
            }

            if (passedTime % 1000 == 0) {
                passedTime = 0;
                _self._super.hunger--;
            }

            if (_self._super.health == 0) {
                _self._super.hunger = 0;
                clearInterval(currentInterval);
            }

        }, 1000);
    },
    introduce: function () {
        return this._super.name;
    },
    portrait: function () {
        var div = $('<div>');
        var img = $("<img>");
        img.attr('src', this.image);
        img.attr('alt', this._super.name);
        img.attr('class', 'draggable portrait');
        img.attr('draggable', true);
        img.attr('ondragstart', 'drag(event)');
        img.attr('ondrop', 'dragonFeed(event)');
        img.attr('ondragover', 'allowDrop(event)');

        div.append(img);
        div.append("<p> <img src='images/healthIndicator.png'  />   " + this._super.health + "    " + " <img src='images/dragonHealth.png' />   "
		+ this._super.hunger + "</p>");
        return div;
    }
});

function drag(ev) {
    if (!ev) {
     ev = window.event;
    }
    // update
    dragSrcEl = (window.event) ? window.event.srcElement /* for IE */ : ev.target;
    var stringData = (dragSrcEl.id).toString();
    ev.dataTransfer.setData("Text", stringData);
};

function allowDrop(ev) {
    if (!ev) 
        ev = window.event;
    ev.preventDefault();
};

function cure(ev) {
    var targ;
    if (!ev) 
        ev = window.event;
    if (ev.target)
        targ = ev.target;
    else if (ev.srcElement) targ = ev.srcElement;

    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    var doctorsLeft = parseInt($('#doctors-left').text());

    if (doctorsLeft == 0) {
        return;
    }
    else if (data.substring(0, 3) == "cat") {
        doctorsLeft--;
        $('#doctors-left').text(doctorsLeft);
        roomId = data.substring(data.indexOf('t') + 1);
        sanMarino.rooms[parseInt(roomId)].roomer._super.health += 1;
    }
}

function dragonFeed(ev) {
    var targ;
    if (!ev) 
        ev = window.event;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    if (data.substring(0, 3) == "cat") {
        roomId = data.substring(data.indexOf('t') + 1);
        sanMarino.rooms[11].roomer._super.hunger += 10;
        sanMarino.rooms[parseInt(roomId)].removeRoomer();
    }
    if (data == "food") {
        sanMarino.rooms[11].roomer._super.hunger -= 100;
    }
}

function findCat(ev) {
    var targ;
    if (!ev) 
        ev = window.event;
    if (ev.target)
        targ = ev.target;
    else if (ev.srcElement) targ = ev.srcElement;

    ev.preventDefault();

    var data = ev.dataTransfer.getData("Text");
    if (data == "food" && targ.id.substring(0, 3) == "cat") {
        var roomId = targ.parentNode.parentNode.id;
        roomId = roomId.substring(roomId.indexOf('m') + 1);

        sanMarino.rooms[parseInt(roomId)].roomer._super.hunger = 10;
    }
}

function getGameScore(nickname) {
    if (!localStorage.getObject("highScore")) {
        localStorage.setObject("highScore", []);
    }

    if (nickname == "") {
        nikcname = "unknown user";
    }

    var currentScore = localStorage.getOject("highScore");
    currentScore.push({ score: highScoreFinal.score, user: nickname });

    if (currentScore.length > 1) {
        currentScore.sort(function (a, b) {
            var x = a[score];
            var y = b[score];

            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
    }

    if (currentScore.length > 10) {
        currentScore.pop();
    }
}

function loadScoreGame() {
    if (localStorage.getObject("highScore")) {
        if (!document.getElementById("scoreBoard")) {
            var scoreDiv = $("<div></div>");
            scoreDiv.attr('id', 'scoreBoard');
        }

        var currentScore = localStorage.getObject("highScore");
        for (var i = 0; i < currentScore.length; i++) {
            scoreDiv.text("<div>" + currentScore[i].user + ": " + currentScore[i].score + "</div>");
        }
        $("#settings").append(scoreDiv);
    }
    else {
        var alertEmptyScorboard = $("<div class='alert'>The scoreboard is empty!</div>");
        $("#settings").append(alertEmptyScorboard);
        setTimeout(function () {
            $("#settings .alert").remove();
        }, 3000);
    }

}

function catWalk(ev) {
    if (!ev) {
        ev = window.event;
    }
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    if (data.substring(0, 3) == "cat") {
        roomId = data.substring(data.indexOf('t') + 1);
        if (sanMarino.rooms[parseInt(roomId)].roomer.mood == 0) {
            sanMarino.rooms[parseInt(roomId)].roomer.mood += 0;
        }

        else {
            sanMarino.rooms[parseInt(roomId)].roomer.mood += 10;
        }
    }
}