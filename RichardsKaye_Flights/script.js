var table;
var flights = [];

var pg

var flight = function(d,flo,fla,tlo,tla,fc,tc) {
  this.distance = d
  this.from_long = flo
  this.from_lat = fla
  this.to_long = tlo
  this.to_lat = tla
  this.from_country = fc
  this.to_country = tc

  this.departureX = map(this.from_long, -180,180,0,width)
  this.departureY = map(this.from_lat, -90,90,height/2,0)
  this.arrivalX = map(this.to_long, -180,180,0,width)
  this.arrivalY = map(this.to_lat, -90,90,height,height/2)

  this.selected = function() {
    if ( dist(mouseX, mouseY, this.departureX, this.departureY) < 10 ) {
        return true
    } else {
        return false
    }
  }

  this.drawBackgroundAirport = function() {
    pg.ellipse(this.departureX, this.departureY, 5,5)
    pg.ellipse(this.arrivalX, this.arrivalY, 5,5)
  }
	
  this.drawSelectedAirport = function() {
    if ( this.selected() ) {
      fill(255,0,0,25)
      ellipse(this.departureX, this.departureY, 5,5)
      ellipse(this.arrivalX, this.arrivalY, 5,5)
    }
  }
}

function preload() {
  table = loadTable("flights.csv","csv","header")
}

function setup() {
  createCanvas(800, 800);
  noStroke()
  noLoop()
	
  var rows = table.getRows()
  for ( var i in rows ) {
    var from_airport = rows[i].getString("from_airport")
    var from_city = rows[i].getString("from_city")
    var from_country = rows[i].getString("from_country")
    var from_long = rows[i].getNum("from_long")
    var from_lat = rows[i].getNum("from_lat")
    var to_airport = rows[i].getString("to_airport")
    var to_city = rows[i].getString("to_city")
    var to_country = rows[i].getString("to_country")
    var to_long = rows[i].getNum("to_long")
    var to_lat = rows[i].getNum("to_lat")
    var airline = rows[i].getString("airline")
    var airline_country = rows[i].getString("airline_country")
    var distance = rows[i].getNum("distance")

    var this_flight = new flight(distance, from_long, from_lat, to_long, to_lat, from_country, to_country)
    flights.push(this_flight)
  }

  pg = createGraphics(800,800);
  pg.background(255,255,255);
  pg.noStroke();
  pg.fill(0,0,0,1);
  for ( var i in flights ) {
    flights[i].drawBackgroundAirport()
	}
}

function draw() {
  background(255,255,255)
  image(pg,0,0)
  for ( var i in flights ) {
    flights[i].drawSelectedAirport()
  }
  //textSize(50)
  //text("circles are airports", 700,50)
}

function mouseMoved() {
  redraw()
}