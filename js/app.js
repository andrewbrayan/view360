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
  const delta = Math.sign(event.wheelDelta)/10;
  console.log('rueda',delta);
  //getting the mouse wheel change (120 or -120 and normalizing it to 1 or -1)
  var myZoom = document.getElementById("camera").getAttribute("zoom");
  console.log('myZoom',myZoom);
  var finalZoom = parseFloat(myZoom) + delta;
  console.log('final zoom',finalZoom);
  //limiting the zoom so it doesnt zoom too much in or out
  if (finalZoom < 1) finalZoom = 1;
  if (finalZoom > 5) finalZoom = 5;

  //setting the camera element
  document.getElementById("camera").setAttribute("zoom", finalZoom);
});
