# 📦 Proyecto de Gestión de Cajas – Agerec S.L.

Este proyecto es una aplicación desarrollada para **Agerec S.L.**, cuyo objetivo principal es permitir la **gestión, consulta y modificación de cajas de conexión** mediante su **dirección IP**. La aplicación está construida con tecnologías **Angular + Ionic** para garantizar una experiencia rápida, moderna y adaptable tanto a dispositivos móviles como de escritorio.

---

## 🧩 Características principales

- 🔍 **Consulta de cajas** mediante su número de serie.
- 🌐 **Enlace por dirección IP**: permite identificar y relacionar cada caja con su ubicación IP.
- ✏️ **Modificación de datos** de la caja directamente desde la interfaz.
- ➕ **Alta de nuevas cajas** mediante formulario interactivo.
- 🔐 **Gestión de usuarios** con roles diferenciados: administrador y desarrollador.
- 🏠 **Barra de navegación** con logo, acceso a inicio y cierre de sesión.

---

## 🛠️ Tecnologías utilizadas

- **Angular** – Framework para desarrollo de aplicaciones SPA.
- **Ionic Framework** – UI nativa e híbrida para móviles y PWA.
- **TypeScript** – Lenguaje principal del proyecto, con tipado fuerte.
- **HTML & SCSS** – Maquetación y estilos personalizados.

---

## 📁 Estructura general del proyecto
src/
├── app/
│ ├── core/ # Servicios (autenticación, utilidades)
│ ├── components/ # Componentes reutilizables (header, etc.)
│ ├── pages/ # Páginas principales (búsqueda, modificación, alta)
│ ├── models/ # Interfaces y modelos de datos (Caja, Usuario)
├── assets/ # Recursos estáticos como imágenes o logos
├── environments/ # Variables de entorno para dev/prod
