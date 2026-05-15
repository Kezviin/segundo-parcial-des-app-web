# 🛒 Take - Fast | Segundo Parcial - Desarrollo de Aplicaciones Web

## Descripcion

**Take - Fast** es una aplicación web modular desarrollada con **Vue.js 3** y **Bootstrap 5**, que simula el sistema de gestión de inventario y tienda en línea de un negocio multi-categoría. La tienda maneja productos de las categorías: Gamer, Electrodomésticos, Aseo y Deportes y ya eso es todo.

La aplicación se divide en 2:
- **Administrador**: Panel de administrador donde se pueden modificar agregar o eliminar productos.
- **Cliente**: Vista normal como cualquier usuario que entra a una pagina de comprar cosas.

---

## 👥 Integrantes

| Nombres |
|---------|
| Kevin Libardo Rosas Quintero 192550 | 
| Julian Devera 192587 | 

---

## 🗂️ Estructura del proyecto

segundo-parcial-des-app-web/
├── public/
├── src/
│   ├── components/
│   │   ├── NavbarComponent.vue
│   │   ├── SidebarComponent.vue
│   │   ├── FooterComponent.vue
│   │   └── ProductCardComponent.vue
│   ├── data/
│   │   ├── products.json
│   │   └── usuarios.json
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── LoginView.vue
│   │   ├── DashboardView.vue
│   │   ├── ProductView.vue
│   │   └── TiendaView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── README.md

---

## Modularizacion

### Componentes
- **NavbarComponent**: barra superior con logo, nombre del negocio y botón de cerrar sesión. Se reutiliza en `DashboardView`.
- **SidebarComponent**: menu lateral con las rutas del panel admin.
- **FooterComponent**: parte de abajo de la pagina.
- **ProductCardComponent**: tarjeta individual de producto que recibe datos por `props` y emite eventos al padre.

### Vistas
- **LoginView**: formulario de autenticacion con validación desde usuarios.json.
- **DashboardView**: panel administrativo que ensambla Navbar, Sidebar, Footer.
- **ProductView**: gestión completa de productos usando LocalStorage.
- **TiendaView**: vista de tienda para el cliente con carrito de compras.

### Rutas
- `/login` → LoginView
- `/dashboard` → DashboardView (solo pueden los admins)
- `/dashboard/productos` → ProductView
- `/tienda` → TiendaView (solo puede el cliente)

---

## 🔄 Comunicación entre componentes (props y eventos)

**ProductCardComponent** recibe un producto por `props` y emite eventos al padre:

```vue
<!-- ProductCardComponent.vue - recibe props -->
<script>
export default {
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  emits: ['editar', 'eliminar']
}
</script>

<!-- ProductView.vue - usa el componente y escucha eventos -->
<ProductCardComponent
  :producto="producto"
  @editar="abrirModalEditar"
  @eliminar="eliminarProducto"
/>
```

---

## Simulacion de API

Los productos se precargan desde `products.json` en el primer uso y luego se gestionan desde LocalStorage:

```js
// Carga inicial
mounted() {
  const guardados = localStorage.getItem('productos')
  if (guardados) {
    this.productos = JSON.parse(guardados)
  } else {
    this.productos = productosJson
    localStorage.setItem('productos', JSON.stringify(this.productos))
  }
}

// Guardar cambios
guardarEnLocalStorage() {
  localStorage.setItem('productos', JSON.stringify(this.productos))
}
```

---

## Evidencia de trabajo colaborativo

| Evidencia | Enlace |
|-----------|--------|
| Repositorio GitHub | https://github.com/Kezviin/segundo-parcial-des-app-web |
| Commits | https://github.com/Kezviin/segundo-parcial-des-app-web/commits/main |
| Ramas | https://github.com/Kezviin/segundo-parcial-des-app-web/branches |
| Pull Requests | https://github.com/Kezviin/segundo-parcial-des-app-web/pulls |

---

## Como arrancar 

```bash
npm install
npm run dev
```

Credenciales de prueba:
- Admin: `admin` / `admin123`
- Cliente: `kevin` / `kevin123`

---

## Referencias

- [Vue.js 3 Documentation](https://vuejs.org/)
- [Bootstrap 5.3 Documentation](https://getbootstrap.com/)
- [MDN LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)


