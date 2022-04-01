AFRAME.registerComponent("change", {
    init: function () {
      this.el.addEventListener("click", () => {
        let scene = document.getElementById("sky").getAttribute("src");
        if (scene.substr(scene.length - 1, 1) == "0") {
          document
            .getElementById("sky")
            .setAttribute("src", scene.substr(0, scene.length - 1) + "1");
  
          changePosition("raycast", "accessories", "19 -1 -15", "0 -50 0");
          changePosition("raycast", "ceiling", "12 4.5 -15", "0 -50 0");
          changePosition("raycast", "electricDist", "-10 -6.5 10", "0 -50 0");
          changePosition("raycast", "floorVin", "-5 -10.2 10", "0 -50 0");
          changePosition("raycast", "doorWind", "7 -0.8 10", "0 50 0");
          changePosition("raycast", "next", "19 1.5 -15", "0 -50 0");
        } else if (scene.substr(scene.length - 1, 1) == "1") {
          document
            .getElementById("sky")
            .setAttribute("src", scene.substr(0, scene.length - 1) + "0");
  
          changePosition("raycast", "accessories", "0.6 -1 -15", "0 0 0");
          changePosition("raycast", "ceiling", "-2 6 -15", "0 0 0");
          changePosition("raycast", "electricDist", "-0.8 -2 15", "0 0 0");
          changePosition("raycast", "floorVin", "1.5 -5.5 15", "0 0 0");
          changePosition("raycast", "doorWind", "6.3 0 15", "0 0 0");
          changePosition("raycast", "next", "0 0 15", "0 0 0");
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
        jsondata[codeAlpha].oficinaStand.navTitle;
    });  