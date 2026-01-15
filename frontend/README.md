# Products CRUD – Frontend

## Repositorio

El código fuente del proyecto se encuentra disponible en GitHub:
https://github.com/Magan-A/products-crud-frontend.git

## Instrucciones para ejecutar la aplicación frontend del sistema de gestión de productos.

## Requisitos

- Node.js (versión 18 o superior)
- Backend ejecutándose en `http://localhost:3001`

---

## Pasos para ejecutar la aplicación

## Crear un archivo .env en la raíz del proyecto frontend con la siguiente linea:

VITE_API_URL=http://localhost:3001

### 1. Entrar a la carpeta del frontend

```bash
cd frontend
npm install #Instalar dependencias
npm i axios #Instalar axios
npm i react-router-dom #Instalar react-router-dom
npm install -D tailwindcss@3 postcss autoprefixer #Instalar tailwindcss
npx tailwindcss init -p #Crear archivo de configuración de tailwindcss
npm i sweetalert2 #Instalar SweetAlert2
npm run dev #Ejecutar aplicación

```

## Acceder a la aplicación

Abrir el navegador y entrar a: http://localhost:5173
