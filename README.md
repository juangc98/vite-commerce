# Calcio Store: E-commerce React con Vite

Calcio Store es un proyecto de e-commerce React creado con Vite, diseñado para ofrecer una experiencia de compra en línea de indumentaria deportiva.
Este proyecto es el resultado final del curso de ReactJs en CoderHouse, donde se aplicaron los conocimientos adquiridos en clases virtuales, material de apoyo, documentación de herramientas y recursos externos, incluyendo la asistencia de ChatGPT para resolver cuestiones más complejas y recibir asistencia en los debuggings de código.

Podes visitar la página con la siguiente url -> https://calciostore.netlify.app/

## Inicialización del Proyecto

Este proyecto fue creado utilizando Vite.

Asegúrate de tener Node.js y npm instalados en tu máquina. El proyecto hace uso de Tailwind CSS para el estilo.

1. *Clona el Repositorio:*

   git clone https://github.com/juangc98/vite-commerce.git

2. *Instala las Dependencias:*

    cd tu-proyecto
    npm install

3. *Instala Firebase*

    Se utilizo Firebase como Base de Datos. Si aún no tienes Firebase instalado, ejecuta el siguiente comando:

    npm install firebase

4. *Configuración del Archivo de Entorno:*

    Crea un archivo .env en la raíz del proyecto y proporciona los valores necesarios, como las claves de API, la URL del servidor, etc.
    
5. *Ejecuta la aplicación*

    npm run dev


### Descripción

Carrito de Compras

Los usuarios pueden agregar productos al carrito, ver un resumen de su carrito y "finalizar compra" (aunque no hay una pasarela de pago integrada, la orden y el stock se actualizarán en la base de datos). Desde el carrito de compras, los usuarios pueden borrar elementos específicos o vaciar el carrito por completo.
Gestión de Órdenes

Las órdenes de los usuarios se gestionan mediante una base de datos, permitiendo a los usuarios realizar un seguimiento del estado de sus pedidos. También tienen la opción de recuperar órdenes anteriores, incluso aquellas creadas desde otros dispositivos. Esto se logra mediante el uso de la base de datos, el localStorage del navegador ("order") y el contexto "cartContext" ({ cart }).
Registro de Usuarios e Inicio de Sesión

Aunque la autenticación no es real, los usuarios pueden simular iniciar sesión. Esto se implementa para demostrar funcionalidades, como el seguimiento y la gestión de órdenes por usuario.

El proyecto utiliza Firebase para almacenar datos, como detalles del producto, categorías, órdenes de los usuarios y usuarios.
Integración con Firestore

Firestore se utiliza para gestionar y almacenar datos en tiempo real, proporcionando una experiencia de usuario fluida.

¡Disfruta explorando el e-commerce React con Vite!

-----

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh