# ÁUREA BAÑOS (demo)

Web de demostración de una sola página para **ÁUREA BAÑOS**, una empresa **ficticia** de reformas integrales de baños en Madrid. No es un negocio real. Sirve para enseñar a empresas reales de reformas cómo podría presentarse su negocio.

La página incluye un banner DEMO siempre visible. Todo el contenido es ilustrativo, el formulario no envía datos y los datos de contacto son ficticios o de demostración.

## Demo publicada

- **URL:** https://mecanexodigital.github.io/laboratorio-web-creativa/
- **Fecha de publicación:** 6 de octubre de 2026.

Es una demo con una empresa ficticia, imágenes ilustrativas generadas con IA y un formulario que no envía ningún dato.

## Estructura de archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Toda la página: Hero, servicios, trabajos, antes y después, proceso, confianza, formulario de presupuesto y footer. |
| `styles.css` | Estilos y variables de color y tipografía. |
| `script.js` | Animación con GSAP: Hero anclado con la imagen que se expande y reveals de los servicios. |
| `compare.js` | Deslizador del antes y después. |
| `form.js` | Validación del formulario de demostración. No envía nada. |
| `favicon.svg` | Icono de la pestaña. |
| `assets/img/` | Imágenes de la página: seis imágenes optimizadas (`hero-bano`, `antes-bano`, `despues-bano` y tres `servicio-*`). Todas generadas con IA (Nano Banana). |

## Cómo ejecutarlo en local

No hay paso de compilación ni dependencias que instalar.

1. Abre `index.html` en el navegador.
2. Necesitas conexión a internet, porque GSAP y ScrollTrigger se cargan desde un CDN. Sin conexión la página se ve, pero sin la animación del Hero.

También puedes servir la carpeta con cualquier servidor estático local.

## Datos que se completan para un cliente real

En la demo, estos datos aparecen como huecos de demostración con un texto neutro:

- Lista definitiva de servicios.
- Descripción real de cada paso del proceso (consulta, propuesta, obra y entrega).
- Elementos de confianza: reseñas de clientes, acreditaciones y certificaciones, garantías y experiencia.
- Trabajos reales para la galería.
- Número de WhatsApp y número de teléfono de la empresa (constantes vacías al inicio de `script.js`).
- Email y dirección de la empresa.
- Texto de la política de privacidad y responsable del tratamiento, en la casilla del formulario.
- Aviso legal, política de privacidad y política de cookies (textos que se adaptan a cada empresa antes de publicar).

Quedan además sin confirmar:

- Condiciones de uso comercial de la herramienta con la que se generen las imágenes con IA.
- Licencia vigente de GSAP para uso comercial.

## Qué cambiar para adaptarlo a un cliente real

- **Textos:** sustituir los huecos de demostración por contenido real y verificable. Quitar el banner DEMO y las frases que indican que la empresa es ficticia, incluidos el título y la descripción de `index.html`.
- **Imágenes:** sustituir los marcadores ilustrativos por imágenes reales de trabajos, solo con autorización de la empresa y de quien aparezca en ellas, y quitar las etiquetas "Imagen ilustrativa".
- **Imágenes generadas con IA:** se permiten, siempre que (1) estén etiquetadas de forma visible como "Imagen ilustrativa generada con IA. No es una obra real", (2) no incluyan personas, logotipos ni marcas y (3) nunca se presenten como una reforma ejecutada. Las condiciones de uso comercial de la herramienta con la que se generen están sin confirmar.
- **Teléfono y WhatsApp:** definir `PHONE_NUMBER` y `WHATSAPP_NUMBER` al inicio de `script.js` (hoy vacíos). Con un número, los botones abren WhatsApp o marcan; vacíos, solo muestran un aviso de demostración. El +34 000 000 000 es ficticio: sustituirlo también donde aparece escrito, en el Hero y el footer.
- **Legal:** redactar con asesoramiento el aviso legal, la política de privacidad y la de cookies, y completar el texto de la casilla de privacidad.
- **Formulario:** `form.js` solo valida y siempre cancela el envío. Para usarlo de verdad hay que conectar un servicio de recepción de datos y adaptar el mensaje de confirmación.
- **Indexación:** la página lleva `noindex, nofollow` porque es una demo. Quitarlo si se publica como web real.

## Librerías externas

- **GSAP 3.12.5** y su plugin **ScrollTrigger**, cargados desde jsDelivr por CDN (`cdn.jsdelivr.net`). Son los únicos recursos externos. Las fuentes son las del sistema.
- **Licencia de GSAP para uso comercial:** sin confirmar. Hay que comprobar la licencia vigente en el sitio oficial de GSAP antes de usarlo en una web comercial.
