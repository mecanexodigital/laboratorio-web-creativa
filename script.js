// Contacto: WhatsApp y teléfono.
// Con el número vacío (modo demo) los botones NO abren WhatsApp ni marcan: muestran un aviso.
// Este bloque va antes del código de GSAP para que siga funcionando si el CDN no carga.
const WHATSAPP_NUMBER = ""; // Se completa con el dato real del cliente. Formato internacional, solo cifras.
const PHONE_NUMBER = "";    // Se completa con el dato real del cliente. Formato internacional.
const WHATSAPP_MESSAGE = "Hola, me gustaría pedir información sobre una reforma de baño.";

(function () {
  var NOTICES = {
    whatsapp: "Botón de demostración: en un cliente real abriría WhatsApp con el número de la empresa.",
    phone: "Botón de demostración: en un cliente real marcaría el teléfono de la empresa."
  };
  var whatsappDigits = WHATSAPP_NUMBER.replace(/\D/g, "");
  var phoneClean = PHONE_NUMBER.replace(/[^\d+]/g, "");

  var notice = document.getElementById("demo-notice");
  var noticeText = document.getElementById("demo-notice-text");
  var live = document.getElementById("demo-notice-live");
  var closeBtn = document.getElementById("demo-notice-close");
  var lastTrigger = null;

  function show(text, trigger) {
    lastTrigger = trigger;
    noticeText.textContent = text;
    notice.hidden = false;
    // Se vacía y se reescribe para que el lector de pantalla lo anuncie en cada pulsación.
    live.textContent = "";
    setTimeout(function () { live.textContent = text; }, 50);
  }

  function hide(returnFocus) {
    if (notice.hidden) return;
    notice.hidden = true;
    live.textContent = "";
    if (returnFocus && lastTrigger) lastTrigger.focus();
  }

  if (notice && noticeText && live && closeBtn) {
    closeBtn.addEventListener("click", function () { hide(true); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") hide(true);
    });
  }

  // Cualquier enlace de contacto: incluidos los tel: ya existentes, sin editar su marcado.
  document.querySelectorAll('a[data-contact], a[href^="tel:"]').forEach(function (link) {
    var kind = link.getAttribute("data-contact") || "phone";

    if (kind === "whatsapp" && whatsappDigits) {
      link.href = "https://wa.me/" + whatsappDigits + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      return;
    }
    if (kind === "phone" && phoneClean) {
      link.href = "tel:" + phoneClean;
      return;
    }

    link.addEventListener("click", function (event) {
      event.preventDefault();
      if (notice) show(NOTICES[kind], link);
    });
  });
})();

gsap.registerPlugin(ScrollTrigger);

const hero = document.querySelector(".hero");
const media = document.querySelector(".hero-media");
const copy = document.querySelector(".hero-copy");

const mm = gsap.matchMedia();

mm.add(
  {
    motion: "(prefers-reduced-motion: no-preference)",
    reduced: "(prefers-reduced-motion: reduce)"
  },
  (context) => {
    // Con reduced-motion el Hero ya se muestra expandido por CSS: sin pin ni animación.
    if (!context.conditions.motion) return;

    // Patrón 1 (Pin & Expand): solo transform (scale, x, y) y opacity.
    // Tamaño y posición del marcador en reposo, para escalarlo hasta cubrir el Hero.
    const cover = () => {
      const w = media.offsetWidth;
      const h = media.offsetHeight;
      return Math.max(hero.clientWidth / w, hero.clientHeight / h);
    };
    const shiftX = () => hero.clientWidth / 2 - (media.offsetLeft + media.offsetWidth / 2);
    const shiftY = () => hero.clientHeight / 2 - (media.offsetTop + media.offsetHeight / 2);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // El texto ya es invisible: sácalo del foco y del árbol de accesibilidad.
          // La barra fija de contacto mantiene las mismas acciones alcanzables.
          const gone = self.progress >= 0.6;
          copy.classList.toggle("is-hidden", gone);
          copy.toggleAttribute("inert", gone);
        }
      }
    });

    tl.to(media, {
      scale: cover,
      x: shiftX,
      y: shiftY,
      duration: 1,
      ease: "none"
    }, 0);

    tl.to(copy, {
      opacity: 0,
      y: -24,
      duration: 0.6,
      ease: "none"
    }, 0);

    return () => {
      copy.classList.remove("is-hidden");
      copy.removeAttribute("inert");
    };
  }
);

// Patrón 3 (Scroll Reveal): servicios. Solo opacity y transform.
// Con reduced-motion no se crea ninguna animación y todo se ve desde el principio.
const revealMM = gsap.matchMedia();

revealMM.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.utils.toArray(".service, .work").forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    });
  });
});
