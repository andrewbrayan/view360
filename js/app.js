AFRAME.registerComponent("pick", {
  init: function () {
    this.el.addEventListener("click", () => {
      document.querySelector('#infoPanel').setAttribute('visible', 'true')
    });
  },
});

AFRAME.registerComponent("close", {
  init: function () {
    this.el.addEventListener("click", () => {
      document.querySelector('#infoPanel').setAttribute('visible', 'false')
    });
  },
});

