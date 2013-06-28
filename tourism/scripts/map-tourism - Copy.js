(function($) {


var map;
var capitals;
var counter;

function initialize() {
    var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(42.69959515809203, 23.337364196777344),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    capitals = [];
    counter = 0;

    var tallinInfo = 
      '<p>Satellite view is showing Tallinn (for centurys known as Reval), largest city, main port, and the national capital of  Estonia. The city is located on the northern coast of Estonia, along the Gulf of Finland.' +
      'Tallin has a population of about 400,000. Spoken language is Estonian.' +
      'The European Capital of Culture in 2011 is home to the Tallinn University of Technology and the Tallinn University.</p>';
    var tallinMarker = new MapMarker(59.11958753380499, 25.169677734375, tallinInfo, 'Tallinn, Estonia', 'green');
    capitals.push(tallinMarker);

    var parisInfo = 
      '<p>Satellite view showing Paris, the national capital and largest city of  France, situated on the River Seine in northern France. Paris has a city population of about 2.15 million inhabitants, in its metropolitan area there live almost 10 million people. The "The City of Lights" is one of the great cultural centers of Europe, famous for its lifestyle, arts and fashion.</p>';
    var parisMarker = new MapMarker(48.852291406043825, 2.352447509765625, parisInfo, 'Paris, France', 'yellow');
    capitals.push(parisMarker);

    var berlinInfo = 
      '<p>Satellite view is showing Berlin, largest city and the national capital of  Germany, located in northeastern Germany, surrounded by the Federal State of Brandenburg, the city center lies along the river Spree. Berlin is also one of the 16 Federal States of Germany. At the end of World War II, the city was occupied by the Allies and divided into two parts: West Berlin and East Berlin. Between 1961 and 1989, the Berlin Wall separated the two parts, which were reunited in 1990.</p>';
    var berlinMarker = new MapMarker(52.52374150329883, 13.412246704101562, berlinInfo, 'Berlin, Germany', 'red');
    capitals.push(berlinMarker);

    var viennaInfo = 
      '<p>Satellite view is showing Vienna, at the Danube river, by far the largest city and national capital of  Austria, located in the northeastern part of the country and is close to Slovakia, Czech Republic and Hungary. Vienna developed from early Celtic and Roman settlements into a Medieval and Baroque city. From 1278 to 1918 it was the seat of the Habsburgs and it was until 1918 one of the two capitals of the Austro-Hungarian Empire (the other was Budapest). The Historic center of Vienna is now a UNESCO World Heritage site. Vienna (in German: Wien) is the economic and political center of the "Alpenrepublik" (Austria, the alps republic), and has long been a center of the arts, esp. music. Mozart, Beethoven, Haydn, and the Strauss family were among the composers who lived and worked there.</p>';
    var viennaMarker = new MapMarker(48.21003212234042, 16.369972229003906, viennaInfo, 'Vienna (Wien), Austria', 'blue');
    capitals.push(viennaMarker);

    var madridInfo = 
      "<p>Satellite view is showing Madrid, largest city, economical and political center and the national capital of  Spain, The city is located on a high plateau in the center of the country at the Manzanares river. In Madrid's metropolitan area (urban area and suburbs) there live almost 6 million people. </p>";
    var madridMarker = new MapMarker(40.41114339950097, -3.6879730224609375, madridInfo, 'Madrid, Spain', 'purple');
    capitals.push(madridMarker);

    var osloInfo = 
      "<p>Founded in the 11th century, it was known as Christiania (or Kristiania) from 1624 until 1924 in honor of Christian IV of Norway and Denmark (1577–1648). The city is the seat of the country's government. Oslo is Norway’s primary city and its cultural, economic, scientific, and political center, and it is an important center of maritime knowledge in Europe. Oslo is considered to be a global city, it is ranked a 'Beta World City Plus'. </p>";
    var osloMarker = new MapMarker(59.91295532794218, 10.74514389038086, osloInfo, 'Oslo, Norway', 'orange');
    capitals.push(osloMarker);

    var dakarInfo = 
      "<p>Main attractions in Dakar are the Dakar Grand Mosque (built in 1964), one of the most important religious building in the city. Gorée Island, a destination for people interested in the Atlantic slave trade. IFAN Museum of West African culture, one of the oldest art museums in West Africa, the African Renaissance Monument, a 49 m (160ft) high bronze statue. Other attractions are cliff top walks, beaches, major markets, and Hann Park, home to Senegal Zoo.</p>";
    var dakarMarker = new MapMarker(14.68855296094455, -17.359771728515625, dakarInfo, 'Dakar, Senegal', 'orange');
    capitals.push(dakarMarker);

    var athensInfo = 
      "<p>Athens was a flourishing city-state in ancient Greece, it was an important cultural center in the 5th century bc. Athens was chosen as the capital of a newly independent Greece in 1834.</p>";
    var athensMarker = new MapMarker(37.97153793552019, 23.728065490722656, athensInfo, 'Athens, Greece', 'blue');
    capitals.push(athensMarker);

    var romeInfo = 
      "<p>According to tradition, the ancient city was founded by Romulus (after whom it is named) in 753 bc on the Palatine Hill; as it grew it spread to the other six hills of Rome. Since 1871 Rome is the capital of a unified Italy. </p>";
    var romeMarker = new MapMarker(37.97153793552019, 23.728065490722656, romeInfo, 'Rome (Roma), Italy', 'green');
    capitals.push(romeMarker);


    var navContainer = $('<div id="nav"></div>');
    var nav = $("<ul/>");
    for (var i = 0; i < capitals.length; i++) {
      var item = $('<li></li>');
      item.append(capitals[i].title);
      item.bind('click', {marker: capitals[i], current: i}, function(event) {
        var data = event.data;
        counter = data.current;
        //console.log(data.marker);
        map.panTo((data.marker).getPosition());
    });
      nav.append(item);
    };

    $('body').append(navContainer.append(nav));

    var prevbtn = $("<button/>");
    var nextbtn = $("<button/>");
    prevbtn.attr('id', 'btn-prev');
    nextbtn.attr('id', 'btn-next');
    prevbtn.on('click', previous);
    nextbtn.on('click', next);

    $('#nav').append(nextbtn);
    $('#nav').append(prevbtn);
}

function next() {
  if(counter < capitals.length - 1) {
      counter += 1;
  } else {
      counter = 0;
  }
  map.panTo(capitals[counter].getPosition());
}

function previous() {
  if(counter > 0) {
      counter -= 1;
  } else {
      counter = capitals.length - 1;
  }
  map.panTo(capitals[counter].getPosition());
}

 var MapMarker = Class.create({
    init: function(latitude, longitude, info, title, color) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.info = info;
      this.title = title;
      this.color = color;
      this.marker = this.createMarker();
    },
    createMarker: function () {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.latitude, this.longitude),
        map: map,
        title: this.title
      }); 
      iconFile = 'http://maps.google.com/mapfiles/ms/icons/' + this.color + '-dot.png';
      marker.setIcon(iconFile);

      var infowindow = new google.maps.InfoWindow({
          content: this.info
      });

      google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map,marker);
          map.panTo(marker.getPosition());
      });

      return marker;
    },
    getPosition: function() {
      return this.marker.getPosition();
    }

});

 google.maps.event.addDomListener(window, 'load', initialize());
 })(jQuery);