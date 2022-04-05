// se establece objeto para llamar el modal de bootstrap
if (document.getElementById("cardModal")) {
  var myModal = new bootstrap.Modal(document.getElementById("cardModal"), {
    keyboard: true,
  });  
}

// funcion de A-frame para la creacion de atributos personales.
// se crea un atributo que permite llamar una funcion al dar click a cualquier
// objeto con el atributo "pick"

AFRAME.registerComponent("pick", {
  init: function () {
    this.el.addEventListener("click", () => {
      setInfoCard(
        this.el.getAttribute("infoCard"),
        this.el.getAttribute("panorama")
      );
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
  const delta = Math.sign(event.wheelDelta) / 10;

  var myZoom = document.getElementById("camera").getAttribute("zoom");
  var finalZoom = parseFloat(myZoom) + delta;

  if (finalZoom < 1) finalZoom = 1;
  if (finalZoom > 5) finalZoom = 5;

  document.getElementById("camera").setAttribute("zoom", finalZoom);
});

codeAlpha = "es";

// funcion Geolocalizacion
fetch("https://us-central1-econtainers2019.cloudfunctions.net/geojs-country").then((response) => {
  return response.json();
}).then((data) => {
  console.log(data);
  if (data.country == "US") {
    codeAlpha = "en";
  }
})

// funcion para obtener data de Json
function setInfoCard(cardType, panorama) {
  fetch("../assets/text.json")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      console.log(AFRAME.utils.device.isMobile());
      document.getElementById("cardTitle").innerHTML =
        jsondata[codeAlpha][panorama][cardType].titulo;
      document.getElementById("cardDescription").innerHTML =
        jsondata[codeAlpha][panorama][cardType].description;
      document
        .getElementById("cardImg")
        .setAttribute("src", jsondata[codeAlpha][panorama][cardType].card);
    });
}