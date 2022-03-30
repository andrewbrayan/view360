var myModal = new bootstrap.Modal(document.getElementById("cardModal"), {
  keyboard: false,
});

AFRAME.registerComponent("pick", {
  init: function () {
    this.el.addEventListener("click", () => {
      setInfoCard(this.el.getAttribute("infoCard"), this.el.getAttribute("panorama"))      
      myModal.show();
    });
  },
});

AFRAME.registerComponent("close", {
  init: function () {
    this.el.addEventListener("click", () => {
      myModal.hide();
    });
  },
});

window.addEventListener("wheel", (event) => {
  zoom(event);
});

function zoom(event) {
  const delta = Math.sign(event.wheelDelta) / 10;

  var myZoom = document.getElementById("camera").getAttribute("zoom");
  var finalZoom = parseFloat(myZoom) + delta;

  if (finalZoom < 1) finalZoom = 1;
  if (finalZoom > 5) finalZoom = 5;

  document.getElementById("camera").setAttribute("zoom", finalZoom);
}

function setInfoCard(cardType, panorama) {
  fetch("../assets/text.json")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      console.log(AFRAME.utils.device.isMobile());      
      document.getElementById("cardTitle").innerHTML = jsondata.es[panorama][cardType].titulo
      document.getElementById("cardDescription").innerHTML = jsondata.es[panorama][cardType].description
    });
}
