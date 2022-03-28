AFRAME.registerComponent("pick", {
  init: function () {
    this.el.addEventListener("click", () => {
      document.querySelector("#infoPanel").setAttribute("visible", "true");
    });
  },
});

AFRAME.registerComponent("close", {
  init: function () {
    this.el.addEventListener("click", () => {
      document.querySelector("#infoPanel").setAttribute("visible", "false");
    });
  },
});

window.addEventListener("wheel", (event) => {
  zoom(event)
});

function zoom(event) {
  const delta = Math.sign(event.wheelDelta)/10;

  var myZoom = document.getElementById("camera").getAttribute("zoom");
  var finalZoom = parseFloat(myZoom) + delta;

  if (finalZoom < 1) finalZoom = 1;
  if (finalZoom > 5) finalZoom = 5;

  document.getElementById("camera").setAttribute("zoom", finalZoom);
}

console.log(AFRAME.utils.device.isMobile());

function hola() {
  document.getElementById('sky').setAttribute('src', '#oficinaFull1')
}