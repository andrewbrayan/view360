// se establece objeto para llamar el modal de bootstrap
if (document.getElementById("cardModal")) {
  var myModal = new bootstrap.Modal(document.getElementById("cardModal"), {
    keyboard: true,
  });
}

if (localStorage.getItem("codeAlpha") == "es") {
  document
    .querySelector("a-scene")
    .setAttribute(
      "device-orientation-permission-ui",
      "denyButtonText: Denegar; allowButtonText: Permitir; cancelButtonText: Cancelar; deviceMotionMessage: Para un experiencia más inmersiva este sitio web requiere permiso para el uso de sus sensores de moviendo."
    );
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

mouseOver = false;
window.addEventListener("mouseover", (event) => {
  if (event.target.localName == "canvas") {
    mouseOver = true;
  } else {
    mouseOver = false;
  }
});

window.addEventListener("wheel", (event) => {
  if (mouseOver) {
    const delta = Math.sign(event.wheelDelta) / 10;

    var myZoom = document.getElementById("camera").getAttribute("zoom");
    var finalZoom = parseFloat(myZoom) + delta;

    if (finalZoom < 1) finalZoom = 1;
    if (finalZoom > 5) finalZoom = 5;

    document.getElementById("camera").setAttribute("zoom", finalZoom);
  }
});

function howNavigate() {
  document.getElementById("cardTitle").innerHTML = "";
  document.getElementById("cardDescription").innerHTML = "";
  if (codeAlpha == "es") {
    document
      .getElementById("cardImg")
      .setAttribute("src", "../assets/extras/cardHowNav.png");
  } else {
    document
      .getElementById("cardImg")
      .setAttribute("src", "../assets/extras/cardHowNavEN.jpg");
  }

  myModal.show();
}

// funcion Geolocalizacion

codeAlpha = "es";
country = "CO";

fetch("https://us-central1-econtainers2019.cloudfunctions.net/geojs-country")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    country = data.country;
    if (data.country == "US") {
      codeAlpha = "en";
      document.getElementById("sala-ventas-menu").style.display = "none";
      document.getElementById("oficina-sencilla-menu").style.display = "none";
      document
        .getElementById("howControlsImg")
        .setAttribute("src", "../assets/extras/HowNavEN.png");
    }

    fetch("../assets/text.json")
      .then((response) => {
        return response.json();
      })
      .then((jsondata) => {
        menuList = document.querySelectorAll(".textMenu");
        menuList.forEach((element) => {
          params = element.id.split("-");
          element.innerHTML = jsondata[codeAlpha][params[0]][params[1]];
        });
      });

    whatsapp = document.getElementById("whatsapp");
    whatsapp.setAttribute(
      "href",
      getLinkWhatsApp(whatsapp.getAttribute("panorama"))
    );
  });

// funcion para obtener data de Json
function setInfoCard(cardType, panorama) {
  fetch("../assets/text.json")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      document.getElementById("cardTitle").innerHTML =
        jsondata[codeAlpha][panorama][cardType].titulo;
      document.getElementById("cardDescription").innerHTML =
        jsondata[codeAlpha][panorama][cardType].description;
      document
        .getElementById("cardImg")
        .setAttribute("src", jsondata[codeAlpha][panorama][cardType].card);
    });
}

function getLinkWhatsApp(panorama) {
  url = "https://api.whatsapp.com/send/?";
  texto =
    "&text=Hola%20E%20Containers%20tengo%20una%20idea%20genial%20y%20quiero%20hacerla%20realidad&app_absent=0";
  telefono = "";
  if (country == "CO") {
    if (
      panorama == "oficinaFull" ||
      panorama == "oficinaSencilla" ||
      panorama == "salaVentas"
    ) {
      telefono = "phone=573116394356";
      return url + telefono + texto;
    } else if (panorama == "refeer") {
      telefono = "phone=573103617492";
      return url + telefono + texto;
    }
  } else if (country == "US") {
    texto =
      "&text=Hi%20E%20Containers,%20I%20am%20interested%20in%20buying%20or%20renting%20maritime%20containers&app_absent=0";
    if (
      panorama == "oficinaFull" ||
      panorama == "oficinaSencilla" ||
      panorama == "salaVentas"
    ) {
      telefono = "phone=17866059094";
      return url + telefono + texto;
    } else if (panorama == "refeer") {
      telefono = "phone=573164650177";
      return url + telefono + texto;
    }
  } else if (country == "EC") {
    if (
      panorama == "oficinaFull" ||
      panorama == "oficinaSencilla" ||
      panorama == "salaVentas"
    ) {
      telefono = "phone=59323420031";
      return url + telefono + texto;
    } else if (panorama == "refeer") {
      telefono = "phone=59323420031";
      return url + telefono + texto;
    }
  }
}

// if (AFRAME.utils.device.isMobile()) {
//   window.scroll(60, 0);
// }
