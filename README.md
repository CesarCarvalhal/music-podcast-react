# Music Podcast App

**Music Podcast App** es una aplicación web que permite explorar y buscar podcasts sobre música en varias categorías, ver detalles de cada podcast y episodios, y escuchar fragmentos de los episodios. Utiliza la API de iTunes para cargar los podcasts más populares y sus episodios.

## Características

- **Listado de Podcasts**: Muestra los podcasts más populares en la categoría de música.
- **Búsqueda**: Permite buscar podcasts por título o autor.
- **Detalles del Podcast**: Muestra información detallada sobre un podcast, como nombre, autor, descripción y más.
- **Episodios**: Muestra una lista de episodios de un podcast seleccionado.
- **Detalles del Episodio**: Muestra la descripción y un componente de audio para escuchar el episodio.


## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/CesarCarvalhal/music-podcast-react.git
    ```

2. Navega a la carpeta del proyecto:

    ```bash
    cd music-podcast-react
    ```

3. Instala las dependencias:

    ```bash
    yarn install
    ```

## Comandos

### Modo desarrollo

Para ejecutar la aplicación en modo desarrollo:

```
yarn dev
```


### Modo producción

Para ejecutar la aplicación en modo desarrollo:

```
yarn build
```

Este comando genera una versión optimizada de la aplicación, creando los archivos estáticos en el directorio dist listos para producción.

Para servir estos archivos, usa un servidor estático como [serve][serve] con el siguiente comando:

```
yarn global add serve
serve -s dist
```

Para ver la aplicación en modo  _production_, simplemente accede a la siguiente URL: http://localhost:5000.
