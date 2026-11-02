# Vestidor

Vestidor virtual para el móvil (Android y iPhone). Te haces fotos con los conjuntos que te gustan, los etiquetas y cada día la app te propone qué ponerte según la ocasión, la temporada y el tiempo.

Es una **PWA**: se abre en el navegador y se instala en la pantalla de inicio. **Las fotos y los datos se guardan solo en el móvil** (IndexedDB) y no pasan por ningún servidor. El código de este repositorio no contiene ningún dato personal.

## Funciones

- **Hoy**: tiempo del día (Open-Meteo, sin claves) y una sugerencia que tiene en cuenta la ocasión, la temporada, el frío o el calor, la lluvia, los favoritos y lo que llevas más tiempo sin ponerte. Botones «Otra» y «Me lo pongo».
- **Vestidor**: cuadrícula con búsqueda por nombre o prenda, filtros por etiqueta y orden (olvidados, recientes, más puestos).
- **Historial**: qué llevaste cada día, conjuntos olvidados y sin estrenar.
- **Ajustes**: instalar, copia de seguridad en `.zip` (fotos + `vestidor.json`) y restaurar, ubicación del tiempo y espacio usado.

## Probar en local

```sh
node tools/serve.mjs      # http://localhost:8080
```

## Estructura

| Ruta | Qué es |
|---|---|
| `index.html` | Toda la app: CSS, HTML y JS en un archivo. |
| `sw.js` | Service worker (sin conexión). **Sube `VERSION`** al publicar cambios. |
| `manifest.webmanifest` | Datos para instalarla. |
| `img/` | Iconos de la app, generados desde `tools/icon.html`. |
| `icons/` | Iconos Tabler (MIT). `node tools/build-icons.mjs` los incrusta en `index.html`. |

Iconos: [Tabler Icons](https://tabler.io/icons), licencia MIT.
