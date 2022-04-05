AFRAME.registerComponent("change", {
  init: function () {
    this.el.addEventListener("click", () => {
      let scene = document.getElementById("sky").getAttribute("src");
      if (scene.substr(scene.length - 1, 1) == "0") {
        document
          .getElementById("sky")
          .setAttribute("src", scene.substr(0, scene.length - 1) + "1");

        changePosition("raycast", "aireAcondicionado", "5 4.5 -18");
        changePosition("raycast", "accessories", "7 -1.5 -18");
        changePosition("raycast", "ceiling", "9 4.8 -18");
        changePosition("raycast", "electricDist", "-5 -7.2 15", "0 -25 0");
        changePosition("raycast", "floorVin", "1 -8 10");
        changePosition("raycast", "doorWind", "10 -2.5 10", "0 60 0");
        changePosition("raycast", "next", "8 0 -15", "0 0 0");
      } else if (scene.substr(scene.length - 1, 1) == "1") {
        document
          .getElementById("sky")
          .setAttribute("src", scene.substr(0, scene.length - 1) + "0");

        changePosition("raycast", "aireAcondicionado", "2.5 5.3 -15");
        changePosition("raycast", "accessories", "5 -3.5 -15");
        changePosition("raycast", "ceiling", "7 6 -15");
        changePosition("raycast", "electricDist", "-6.7 -2.2 15");
        changePosition("raycast", "floorVin", "-3.5 -5.5 15");
        changePosition("raycast", "doorWind", "0.5 0 15");
        changePosition("raycast", "next", "-7.5 0 15", "0 -25 0");
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

fetch("https://us-central1-econtainers2019.cloudfunctions.net/geojs-country")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    codeAlpha = "es";
    if (data.country == "US") {
      codeAlpha = "en";
    }
    fetch("../assets/text.json")
      .then((response) => {
        return response.json();
      })
      .then((jsondata) => {
        document.getElementById("navTitle").innerHTML =
          jsondata[codeAlpha].oficinaFull.navTitle;
      });
  });
