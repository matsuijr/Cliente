# Repositorio Cliente

## Desarrollado por Joseph Rivera Moraga

Introducción
Este repositorio contiene el frontend de TicoAutos, desarrollado con React. Permite a los usuarios interactuar con el backend, publicar vehículos, aplicar filtros, gestionar sus anuncios y participar en el chat de preguntas y respuestas.

En este repositorio vamos a manejar nuestro frontend el cual se encuentra en:
https://github.com/matsuijr/CLIENT

Cómo ejecutar el proyecto

1. Clonar el repositorio:

2. Instalar dependencias:

npm install

3. Ejecutar la aplicación:

npm run dev

## Páginas principales

Login/Register: autenticación de usuarios.

Vehiculos.jsx: grid con filtros, botones de acción (Ver detalle, Vendido, Eliminar).

ChatVehiculo.jsx: chat estructurado con preguntas y respuestas, mostrando fecha y usuario.

CrearVehiculo.jsx: formulario para publicar vehículo con imágenes.

Home.jsx: menu principal del sistema

## Autenticación

El token JWT se guarda en localStorage.

Todas las llamadas al backend incluyen el header:

Authorization: Bearer <token generado por jwt>

## Flujo de usuario

Registro/Login → obtiene token.

Publicar vehículo → formulario con imagen.

Ver mis vehículos → grid con filtros y acciones.

Chat → compradores preguntan, propietario responde.

## Estilos

CSS modular (Home.css, ChatVehiculo.css).

Cards de vehículos con botones de acción.

Chat con burbujas diferenciadas para preguntas y respuestas.
