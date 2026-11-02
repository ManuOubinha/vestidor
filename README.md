# DressKS

DressKS es un vestidor virtual para el móvil (Android y iPhone). Te haces fotos con los conjuntos que te gustan, los etiquetas y cada día la app te propone qué ponerte según la ocasión, la temporada y el tiempo.

Es una **PWA**: se abre en el navegador y se instala en la pantalla de inicio. **Las fotos y los datos se guardan solo en el móvil** (IndexedDB) y no pasan por ningún servidor. El código de este repositorio no contiene ningún dato personal.

## Funciones

- **Hoy**: tiempo del día (Open-Meteo, sin claves) y una sugerencia que tiene en cuenta la ocasión, la temporada, el frío o el calor, la lluvia, los favoritos y lo que llevas más tiempo sin ponerte. Botones «Otra» y «Me lo pongo».
- **Vestidor**: carpetas «Todos los conjuntos», Primavera, Verano, Otoño e Invierno; dentro, cuadrícula con búsqueda por nombre o prenda, filtros por etiqueta y orden (olvidados, recientes, más puestos).
- **Calendario**, con tres apartados:
  - **Planificar**: calendario del mes; en cada día dejas un conjunto preparado (eliges tú o «Que elija DressKS») o apuntas lo que llevaste un día pasado. El tiempo previsto (16 días) ayuda a elegir. Lo planificado para hoy sale en «Hoy».
  - **Viajes**: destino, fechas y para qué. Mira el tiempo de allí, rellena un conjunto por día y hace la lista de la maleta (prendas sin repetir, con casillas) que se puede compartir.
  - **Historial**: qué llevaste cada día, conjuntos olvidados y sin estrenar.
- **Ajustes**: instalar, personalizar colores (botones, tarjeta del tiempo, detalles), copia de seguridad en `.zip` (fotos + `vestidor.json`, con planes y viajes) y restaurar, ubicación del tiempo y espacio usado.

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
| `img/` | Iconos de la app: `icon-512` y `icon-maskable-512` se fotografían de `tools/icon.html` con Chrome sin ventana; los de 192 y 180 se reducen desde el de 512 (Chrome no hace capturas tan pequeñas). |
| `icons/` | Iconos Tabler (MIT). `node tools/build-icons.mjs` los incrusta en `index.html`. |

Iconos: [Tabler Icons](https://tabler.io/icons), licencia MIT.
