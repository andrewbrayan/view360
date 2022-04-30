AFRAME.registerComponent("change", {
  init: function () {
    this.el.addEventListener("click", () => {
      let scene = document.getElementById("sky").getAttribute("src");
      if (scene.substr(scene.length - 1, 1) == "0") {
        document
          .getElementById("sky")
          .setAttribute("src", scene.substr(0, scene.length - 1) + "1");

        document.getElementById("sky").setAttribute("rotation", "0 -120 0");

        changePosition("raycast", "aireAcondicionado", "-1 4 -15");
        if (codeAlpha == "es") {
          changePosition("raycast", "accessories", "-5 0 -15", null, true);
        }
        changePosition("raycast", "ceiling", "-4.5 7.8 -13");
        changePosition("raycast", "electricDist", "6 1 -15", "0 0 0");
        changePosition("raycast", "floorVin", "-1 -5 -15");
        changePosition("raycast", "doorWind", "1.8 0.5 12.7");
        changePosition("raycast", "next", "-0.7 1 -10");
      } else if (scene.substr(scene.length - 1, 1) == "1") {
        document
          .getElementById("sky")
          .setAttribute("src", scene.substr(0, scene.length - 1) + "0");

        document.getElementById("sky").setAttribute("rotation", "0 10 0");

        changePosition("raycast", "aireAcondicionado", "-0.5 4.8 -15");
        changePosition("raycast", "accessories", "0 0 0", null, false);
        changePosition("raycast", "ceiling", "-4.5 4.5 -15");
        changePosition("raycast", "electricDist", "-10 2 0", "0 90 0");
        changePosition("raycast", "floorVin", "-2 -3 -10");
        changePosition("raycast", "doorWind", "-1.5 3.5 15");
        changePosition("raycast", "next", "-1.5 1 -10");
      }
    });
  },
});

function changePosition(id, infoCard, position, rotation, visible) {
  let objects = document.querySelectorAll("." + id);
  objects.forEach((element) => {
    if (element.getAttribute("infoCard") == infoCard) {
      element.setAttribute("position", position);
      if (rotation) {
        element.setAttribute("rotation", rotation);
      }
      if (visible) {
        element.setAttribute("visible", visible);
      }
    }
  });
}

codeAlpha = "es";

fetch("https://us-central1-econtainers2019.cloudfunctions.net/geojs-country")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.country == "US") {
      codeAlpha = "en";
    }
    fetch("../assets/text.json")
      .then((response) => {
        return response.json();
      })
      .then((jsondata) => {
        document.getElementById("navTitle").innerHTML =
          jsondata[codeAlpha].reefer.navTitle;
      });
  });
