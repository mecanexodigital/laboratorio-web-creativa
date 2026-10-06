// Deslizador antes/después. Independiente de GSAP: actualiza --pos, aria-valuetext
// y muestra cada etiqueta solo mientras su imagen está visible bajo ella.
(function () {
  var stage = document.getElementById("compare-stage");
  var range = document.getElementById("compare-range");
  if (!stage || !range) return;

  var tagBefore = stage.querySelector(".compare-tag-before");
  var tagAfter = stage.querySelector(".compare-tag-after");

  function update() {
    var v = Number(range.value);
    stage.style.setProperty("--pos", v);
    range.setAttribute("aria-valuetext", "Antes al " + v + " %, después al " + (100 - v) + " %");

    var w = stage.clientWidth;
    if (!w) return;
    // "Antes" ocupa [0, v]; "Después" ocupa [v, 100]. La etiqueta se ve si su imagen la cubre entera.
    var beforeEdge = (tagBefore.offsetLeft + tagBefore.offsetWidth) / w * 100;
    var afterEdge = tagAfter.offsetLeft / w * 100;
    tagBefore.classList.toggle("is-off", v < beforeEdge);
    tagAfter.classList.toggle("is-off", v > afterEdge);
  }

  range.addEventListener("input", update);
  window.addEventListener("resize", update);
  update();
})();
