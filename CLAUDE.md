# Vestidor: instrucciones para Claude

Vestidor virtual personal (PWA) para Android e iPhone. Hablar con el usuario en español. Ver `README.md` para funciones y estructura.

## Reglas

- Todo es estático: `index.html` (un solo archivo), `sw.js`, `manifest.webmanifest`, `img/`. Sin dependencias ni build salvo `node tools/build-icons.mjs` tras añadir un SVG a `icons/`.
- **Datos solo en el dispositivo** (IndexedDB `vestidor`: almacén `outfits` y `meta`). Nunca meter fotos ni datos reales en el repo.
- Al cambiar cualquier archivo publicado, **subir `VERSION` en `sw.js`**, o los móviles seguirán con la versión guardada.
- Rutas siempre relativas (se publica en una subcarpeta de GitHub Pages).
- La línea `const ICONS = ...` de `index.html` es muy larga: leer el archivo con `offset`/`limit`.

## Diseño (decisión del usuario)

Estética tipo **holded.com**, igual que Cuentas Claras: tinta azul marino `#121926`, Inter, botones en píldora, tarjetas redondeadas con sombra suave, teselas de icono pastel, tarjeta azul marino (aquí, la del tiempo), fondo de puntos con brillos rosa y lavanda, punto rojo coral tras los títulos. Conceptos, no su marca ni sus textos.
- Botón día/noche arriba; colores en tokens de `:root` redefinidos para oscuro.
- Eliminar en rojo con la pregunta «¿Estás seguro de que deseas eliminar?» (`askDelete`, nunca `confirm()`).
- Animaciones solo al cambiar de pantalla, apagadas con `prefers-reduced-motion`.
- Sin emojis; iconos solo de Tabler.

## Datos de un conjunto

`id`, `created`, `updated`, `photo` (Blob JPEG máx. 1600 px), `thumb` (Blob 480 px), `name`, `garments[]`, `seasons[]` (primavera, verano, otono, invierno), `occasions[]` (trabajo, informal, evento, deporte), `weather[]` (frio, templado, calor, lluvia), `wears[]` (fechas YYYY-MM-DD), `fav`, `notes`. Etiqueta vacía = vale para todas.

## Forma de trabajar

- Probar con `node tools/serve.mjs` y Chrome. Si se crean datos de prueba en localhost, borrarlos al acabar.
- Commits en español, con el trailer de coautoría que indique la sesión.
