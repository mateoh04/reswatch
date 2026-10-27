# RESWATCH · Laboratorio inmersivo

## ▶ Jugar en el navegador

**[Abrir RESWATCH](https://mateoh04.github.io/reswatch/)**

No necesitas instalar nada. La publicación se actualiza automáticamente al integrar cambios en `main`. El enlace estará disponible tras completar el primer despliegue de GitHub Pages.


Experiencia interactiva en español con Three.js y Vite, basada directamente en `base.obj` y en el boceto industrial de referencia.

## Ejecutar

```sh
npm ci
npm run dev
```

Abrir la URL que muestra Vite (puerto 5173). El servidor escucha en `0.0.0.0` para permitir la vista previa de Arena.

```sh
npm run build
npm run preview
```

La compilación incluye una copia **idéntica byte a byte** de `base.obj`. No requiere CDN ni servicios externos en ejecución.

## Explorar

- Arrastrar para orbitar, usar scroll/pellizco o botones +/− para acercar.
- Pausar rotación automática o restablecer la vista original.
- Elegir entre cuatro acabados y entornos Estudio/Inmersivo.
- Pulsar el reloj 3D, su punto de exploración, la corona del panel o la pantalla del panel para cambiar la esfera.
- Modos reloj, actividad y salud sincronizados con la pantalla 3D.
- Sensor de pulso con secuencia de medición y resultado simulado.
- Paneles de sensores y especificaciones basadas en el boceto (no medidas extraídas del OBJ).

## Modelo original

El archivo original permanece intacto. OBJLoader carga su geometría sin simplificaciones, remallado ni cambios de vértices. Se centra mediante una transformación del objeto. Se aplica un material visual y una pantalla independiente de CanvasTexture sobre el frontal: no se modifica la topología del reloj. Las animaciones actúan sobre el grupo de visualización. Al ser un OBJ de una sola pieza, las interacciones de corona y sensores se ofrecen mediante controles de interfaz, sin inventar piezas articuladas.

## Realidad mixta

«Ver en mi espacio» solicita una sesión WebXR `immersive-ar`, solo si el navegador anuncia compatibilidad. Requiere HTTPS y hardware/navegador compatible (por ejemplo, Android con ARCore). En equipos sin soporte se informa claramente y continúa disponible la exploración 3D. El modelo se presenta a escala de visualización frente al usuario, con pantalla interactiva mediante selección XR; **no incluye anclajes, seguimiento de muñeca, oclusión ni hit-test de superficies**. Salir usando el control de sesión del navegador. La disponibilidad real de AR debe comprobarse en un dispositivo compatible; no está validada por las pruebas de escritorio.

Las métricas son demostrativas: no se conectan a dispositivos físicos, no se recogen datos personales y no deben utilizarse para diagnóstico médico. La hora y los pasos son datos de demostración.

## Verificación

```sh
npx playwright install --with-deps chromium
# En otra terminal: npm run dev
npm test
```

Las pruebas verifican carga OBJ, modos de pantalla, acabados, corona, medición simulada, especificaciones, entornos, fallback AR, ancho móvil y ausencia de errores JavaScript. En Arena se ejecutaron con Chromium headless de `@sparticuz/chromium`, SwiftShader y las bibliotecas de su paquete para Linux (`ARENA_CHROMIUM=1`).

## Estructura

- `base.obj`: fuente 3D original.
- `src/main.js`: escena, controles, display y WebXR.
- `src/style.css`: interfaz adaptable.
- `index.html`: estructura accesible de la interfaz.
- `vite.config.js`: servidor y copia de OBJ a producción.
- `tests/check.mjs`: pruebas de navegador.
