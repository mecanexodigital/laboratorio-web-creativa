// Formulario de DEMOSTRACIÓN. No envía datos a ningún sitio: sin fetch, sin action, sin terceros.
(function () {
  var form = document.getElementById("quote-form");
  var fields = document.getElementById("quote-fields");
  var summary = document.getElementById("quote-summary");
  var status = document.getElementById("quote-status");
  if (!form || !fields) return;

  // Activa los campos solo cuando este script ya controla el envío (evita enviar datos por URL sin JS).
  fields.disabled = false;

  var rules = [
    { id: "f-nombre", test: function (el) { return el.value.trim().length > 0; }, msg: "Escribe tu nombre." },
    { id: "f-telefono", test: function (el) { return el.value.replace(/\D/g, "").length >= 9 && /^[+\d\s().-]+$/.test(el.value.trim()); }, msg: "Escribe un teléfono válido, con al menos 9 cifras." },
    { id: "f-tipo", test: function (el) { return el.value !== ""; }, msg: "Elige el tipo de reforma." },
    { id: "f-zona", test: function (el) { return el.value.trim().length > 0; }, msg: "Escribe tu municipio o zona." },
    { id: "f-descripcion", test: function (el) { return el.value.trim().length >= 10; }, msg: "Cuéntanos un poco más: escribe al menos 10 caracteres." },
    { id: "f-email", test: function (el) { return el.value.trim() === "" || el.checkValidity(); }, msg: "Revisa el email: debe tener un formato como nombre@ejemplo.com." },
    { id: "f-privacidad", test: function (el) { return el.checked; }, msg: "Marca la casilla de privacidad para continuar." }
  ];

  function setError(el, message) {
    var out = document.getElementById(el.id + "-error");
    if (message) {
      el.setAttribute("aria-invalid", "true");
      out.textContent = message;
      out.hidden = false;
    } else {
      el.removeAttribute("aria-invalid");
      out.textContent = "";
      out.hidden = true;
    }
  }

  function check(rule) {
    var el = document.getElementById(rule.id);
    var ok = rule.test(el);
    setError(el, ok ? "" : rule.msg);
    return ok ? null : el;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Nunca se envía nada.
    status.hidden = true;

    var invalid = rules.map(check).filter(Boolean);

    if (invalid.length) {
      summary.textContent = invalid.length === 1
        ? "Hay 1 campo que revisar."
        : "Hay " + invalid.length + " campos que revisar.";
      invalid[0].focus();
      return;
    }

    summary.textContent = "";
    form.reset();
    rules.forEach(function (rule) { setError(document.getElementById(rule.id), ""); });
    status.hidden = false;
    status.focus();
  });

  // Corrige el error de un campo en cuanto el usuario lo arregla.
  rules.forEach(function (rule) {
    var el = document.getElementById(rule.id);
    var evt = el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input";
    el.addEventListener(evt, function () {
      if (el.getAttribute("aria-invalid") === "true" && rule.test(el)) setError(el, "");
    });
  });
})();
