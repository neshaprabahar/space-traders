
let currentCoords = [0, 0]

export default function sketch (p) {
    var regions = "";
    var allRegions = []
    var userData = "";
    var shipData = "";
    let currRegion = "User"
    let images = []
    let bg;
    var shipImage = "";
    var username = "";

    p.preload = function() {
        regions = p.loadJSON("http://127.0.0.1/getRegions")
        shipData = p.loadJSON("http://127.0.0.1:80/getShipData", res => {
          currentCoords = res["currCoords"].split(",").map(x => parseInt(x))
        })
        for (var i = 1; i < 12; i++) {
          images.push(p.loadImage("http://127.0.0.1/getImage?image=planet" + i + ".png"))
        }
        bg = p.loadImage("http://127.0.0.1/getImage?image=universe.png")
        shipImage = p.loadImage("http://127.0.0.1/getImage?image=ship.png")
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
      if (props.username) {
        username = props.username
        userData = p.loadJSON("http://127.0.0.1:80/getUserData?username=" + username, (res) => {
          var usePreviousLocation = window.localStorage.getItem("usePreviousLocation")
          console.log(usePreviousLocation)
          if (usePreviousLocation == "true") {
            console.log(res)
            var info = {
              region: res.previousRegion,
              fuel_left: res.ship.fuel,
              old_region: res.previousRegion,
              old_coords: res.ship.oldCoords
            }
            currRegion = res.currRegion
            currentCoords = res.ship['oldCoords'].split(',').map(x => parseInt(x))
            fetch('http://127.0.0.1:80/sendRegionData', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(info)
            }).then(window.localStorage.setItem("usePreviousLocation", "false"))
        }
        })

    }
    };

    p.setup = function () {
      p.translate(innerWidth/2, innerHeight/2)
      p.createCanvas(innerWidth, innerHeight);
      for (var key in regions) {
          var splitted = regions[key]['coords'].split(',');
          var tech_level = regions[key]['techlevel']
          allRegions.push(new Region(parseInt(splitted[0]), parseInt(splitted[1]), tech_level, p, key))
      }

    };

    p.mouseClicked = function() {
        var mY = p.mouseY - innerHeight / 2
        var mX = p.mouseX - innerWidth / 2
        for (var i = 0; i < allRegions.length; i++) {
          var fakeCoord = [allRegions[i].x * 3, allRegions[i].y * 1.5]
            if (mX >= fakeCoord[0] - 88 && mX <= fakeCoord[0] + 88 && mY <= fakeCoord[1] + 80 && mY >= fakeCoord[1] - 80) {
                var distance = Math.ceil(Math.sqrt(Math.pow((allRegions[i].x - currentCoords[0]), 2) + Math.pow((allRegions[i].y - currentCoords[1]), 2)))
                var fuel = parseInt(shipData['fuel'])
                var skill = parseInt(userData['skills']['pilot'])
                var fuelcost = Math.ceil(distance / (skill * 2) + 5)
                var remfuel = fuel - fuelcost
                var oldCoords = currentCoords[0] + "," + currentCoords[1]
                if (remfuel > 0) {
                  var toTravel = confirm("Are you sure you want to travel to " + allRegions[i].name + "?")
                  if (toTravel) {
                    currentCoords = [allRegions[i].x, allRegions[i].y]
                    currRegion = allRegions[i].name
                    var previous_name = "";
                    var info = {
                      region: currRegion,
                      fuel_left: remfuel,
                      old_region: previous_name,
                      old_coords: oldCoords
                    }
                    fetch('http://127.0.0.1:80/sendRegionData', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                      body: JSON.stringify(info)
                    }).then(() => {
                      if (userData['difficulty'] == 'easy') {
                        var chance = Math.floor(Math.random() * 10);
                        if (chance == 1) {
                          window.location.href = "/bandit"
                        } else if (chance == 2) {
                          window.location.href = "/trader"
                        } else if (chance == 3) {
                          if (shipData['cargo'] != 0) {
                            window.location.href = "/police"
                          }
                        } else {
                          window.location.href = "/region"
                        }
                      }
                      if (userData['difficulty'] == 'medium') {
                        var chance = Math.floor(Math.random() * 10);
                        if (chance == 1 || chance == 2) {
                          window.location.href = "/bandit"
                        } else if (chance == 3 || chance == 4) {
                          window.location.href = "/trader"
                        } else if (chance == 5) {
                          if (shipData['cargo'] != 0) {
                            window.location.href = "/police"
                          }
                        } else {
                          window.location.href = "/region"
                        }
                      }
                      if (userData['difficulty'] == 'hard') {
                        var chance = Math.floor(Math.random() * 10);
                        if (chance == 1 || chance == 2 || chance == 3) {
                          window.location.href = "/bandit"
                        } else if (chance == 4) {
                          window.location.href = "/trader"
                        } else if (chance == 7 || chance == 5 || chance == 6) {
                          if (shipData['cargo'] != 0) {
                            window.location.href = "/police"
                          }
                        } else {
                          window.location.href = "/region"
                        }
                      }
                    })
                  }
                } else {
                  alert("Sorry you have insufficient fuel to travel to this location, find someplace closer.")
                }
            }
        }
    }


    p.draw = function () {

      p.translate(innerWidth/2, innerHeight/2)
      p.background(bg);
      p.textSize(15);
      for (var i = 0; i < allRegions.length; i++) {
        var realCoord = [allRegions[i].x, allRegions[i].y]
        var fakeCoord = [allRegions[i].x*3, allRegions[i].y*1.5]
        if (realCoord[0] == currentCoords[0] && realCoord[1] == currentCoords[1]) {
          p.fill(0, 255, 0);
        } else {
          p.fill(255, 255, 255);
        }
        p.push()
        p.imageMode("center");
        p.image(images[i], fakeCoord[0], fakeCoord[1], 85, 80)
        p.text("Name: " + allRegions[i].name, fakeCoord[0] - 40, fakeCoord[1] - 55)
        p.text("X: " + realCoord[0] + " Y: "+ realCoord[1], fakeCoord[0] - 40, fakeCoord[1] + 45)
        var distance = Math.ceil(Math.sqrt(Math.pow((realCoord[0] - currentCoords[0]), 2) + Math.pow((realCoord[1] - currentCoords[1]), 2)))
        p.text("Distance: " + distance, fakeCoord[0] - 40, fakeCoord[1] + 60)
        p.text("TechLevel: " + allRegions[i].tech, fakeCoord[0] - 40, fakeCoord[1]  - 40)
        p.pop()
      }
      p.push()
      p.imageMode("center");
      p.image(shipImage, currentCoords[0]*3 + 80, currentCoords[1]*1.5, 85, 80)
      p.fill(0, 255, 0);
      p.text("X: " + currentCoords[0] + ", Y: " +  currentCoords[1], currentCoords[0] * 3 + 30, (currentCoords[1] * 1.5) + 60)
      p.fill(255, 255, 255);
      p.textSize(20);
      p.text("Username : " + username,  10 - innerWidth / 2 , 20 - innerHeight/2 )
      p.text("Current Coords : " + currentCoords,  10 - innerWidth / 2 , 40 - innerHeight/2 )
      p.text("Current Region : " + currRegion,  10 - innerWidth / 2 , 60 - innerHeight/2 )
      p.text('Fuel Left: ' + shipData['fuel'], 10 - innerWidth / 2 , 80 - innerHeight/2)
      
      p.pop()
    };
  };

  class Region {
      constructor(x, y, tech, p, name) {
          this.x = x;
          this.y = y;
          this.tech = tech;
          this.p = p;
          this.name = name
      }
  }

