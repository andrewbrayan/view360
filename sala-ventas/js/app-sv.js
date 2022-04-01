AFRAME.registerComponent("change", {
    init: function () {
      this.el.addEventListener("click", () => {
        let scene = document.getElementById("sky").getAttribute("src");
        if (scene.substr(scene.length - 1, 1) == "0") {
          document
            .getElementById("sky")
            .setAttribute("src", scene.substr(0, scene.length - 1) + "1");
  
          changePosition("raycast", "aireAcondicionado", "24.8 6.4 -2", "0 100 0");
          changePosition("raycast", "accessories", "10.7 -7.8 -10.2", "0 -30 0");
          changePosition("raycast", "ceiling", "-8.5 10.7 7", "0 -80 0");
          changePosition("raycast", "electricDist", "15.4 -2.5 -6.6", "0 -60 0");
          changePosition("raycast", "floorVin", "15 -4 1.5", "0 80 0");
          changePosition("raycast", "doorWind", "18 0.5 12.7", "0 50 0");
          changePosition("raycast", "next", "15 0 1", "0 80 0");
        } else if (scene.substr(scene.length - 1, 1) == "1") {
          document
            .getElementById("sky")
            .setAttribute("src", scene.substr(0, scene.length - 1) + "0");
  
          changePosition("raycast", "aireAcondicionado", "20 7 2.5", "0 90 0");
          changePosition("raycast", "accessories", "-6.5 -3.7 -15", "0 0 0");
          changePosition("raycast", "ceiling", "-22 8.5 -8.5", "0 60 0");
          changePosition("raycast", "electricDist", "12.5 -6 -13", "0 -30 0");
          changePosition("raycast", "floorVin", "13.5 -5.5 5.5", "0 70 0");
          changePosition("raycast", "doorWind", "-7 -1 11", "0 -30 0");
          changePosition("raycast", "next", "-10 0 -9", "0 50 0");
        }
      });
    },
  });
  
  function changePosition(id, infoCard, position, rotation) {
    let objects = document.querySelectorAll("." + id);
    objects.forEach((element) => {
      if (element.getAttribute("infoCard") == infoCard) {
        element.setAttribute("position", position);
        if (rotation) {
          element.setAttribute("rotation", rotation);
        }
      }
    });
  }
  
  codeAlpha = "en";
  fetch("../assets/text.json")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      document.getElementById("navTitle").innerHTML =
        jsondata[codeAlpha].SalesRoom.navTitle;
    });  